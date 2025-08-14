const express = require('express');
const Phone = require('../models/Phone');
const Match = require('../models/Match');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all phones with filtering
router.get('/', async (req, res) => {
  try {
    const {
      type,
      brand,
      status,
      search,
      lat,
      lng,
      radius = 10,
      page = 1,
      limit = 20
    } = req.query;

    let query = {};

    // Apply filters
    if (type && type !== 'all') query.type = type;
    if (brand && brand !== 'All Brands') query.brand = brand;
    if (status && status !== 'All Status') query.status = status;

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Location-based search
    if (lat && lng) {
      const radiusInRadians = radius / 3963.2; // Convert miles to radians
      query['location.lat'] = {
        $gte: parseFloat(lat) - radiusInRadians,
        $lte: parseFloat(lat) + radiusInRadians
      };
      query['location.lng'] = {
        $gte: parseFloat(lng) - radiusInRadians,
        $lte: parseFloat(lng) + radiusInRadians
      };
    }

    const phones = await Phone.find(query)
      .populate('reportedBy', 'name reputation verified')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Phone.countDocuments(query);

    res.json({
      phones,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get phone by ID
router.get('/:id', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id)
      .populate('reportedBy', 'name reputation verified avatar');
    
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }

    res.json(phone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Report lost/found phone
router.post('/', auth, async (req, res) => {
  try {
    const phoneData = {
      ...req.body,
      reportedBy: req.user._id
    };

    const phone = new Phone(phoneData);
    await phone.save();

    // Populate the reportedBy field for response
    await phone.populate('reportedBy', 'name reputation verified');

    // If this is a lost phone, check for potential matches
    if (phone.type === 'lost') {
      await findPotentialMatches(phone);
    }

    res.status(201).json({
      message: 'Phone reported successfully',
      phone
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update phone
router.put('/:id', auth, async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }

    // Check if user owns this phone report
    if (phone.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedPhone = await Phone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('reportedBy', 'name reputation verified');

    res.json({
      message: 'Phone updated successfully',
      phone: updatedPhone
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete phone
router.delete('/:id', auth, async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }

    // Check if user owns this phone report
    if (phone.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Phone.findByIdAndDelete(req.params.id);

    res.json({ message: 'Phone report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find potential matches for a lost phone
async function findPotentialMatches(lostPhone) {
  try {
    const foundPhones = await Phone.find({
      type: 'found',
      status: 'active',
      brand: lostPhone.brand,
      model: lostPhone.model
    });

    for (const foundPhone of foundPhones) {
      let confidence = 0;
      const matchingFactors = [];

      // Brand and model match (already filtered)
      confidence += 30;
      matchingFactors.push({ factor: 'brand', score: 100 });
      matchingFactors.push({ factor: 'model', score: 100 });

      // Color match
      if (lostPhone.color.toLowerCase() === foundPhone.color.toLowerCase()) {
        confidence += 25;
        matchingFactors.push({ factor: 'color', score: 100 });
      }

      // IMEI match (highest priority)
      if (lostPhone.imei && foundPhone.imei && lostPhone.imei === foundPhone.imei) {
        confidence += 40;
        matchingFactors.push({ factor: 'imei', score: 100 });
      }

      // Location proximity (within 5km)
      const distance = calculateDistance(
        lostPhone.location.lat,
        lostPhone.location.lng,
        foundPhone.location.lat,
        foundPhone.location.lng
      );

      if (distance <= 5) {
        const locationScore = Math.max(0, 100 - (distance * 20));
        confidence += locationScore * 0.05;
        matchingFactors.push({ factor: 'location', score: locationScore });
      }

      // Only create match if confidence is above threshold
      if (confidence >= 60) {
        const existingMatch = await Match.findOne({
          lostPhoneId: lostPhone._id,
          foundPhoneId: foundPhone._id
        });

        if (!existingMatch) {
          const match = new Match({
            lostPhoneId: lostPhone._id,
            foundPhoneId: foundPhone._id,
            confidence,
            matchingFactors
          });

          await match.save();
        }
      }
    }
  } catch (error) {
    console.error('Error finding matches:', error);
  }
}

// Calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
}

module.exports = router;