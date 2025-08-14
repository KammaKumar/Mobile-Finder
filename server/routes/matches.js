const express = require('express');
const Match = require('../models/Match');
const Phone = require('../models/Phone');
const auth = require('../middleware/auth');

const router = express.Router();

// Get matches for a user
router.get('/', auth, async (req, res) => {
  try {
    // Find phones reported by the user
    const userPhones = await Phone.find({ reportedBy: req.user._id });
    const phoneIds = userPhones.map(phone => phone._id);

    // Find matches for user's phones
    const matches = await Match.find({
      $or: [
        { lostPhoneId: { $in: phoneIds } },
        { foundPhoneId: { $in: phoneIds } }
      ]
    })
    .populate({
      path: 'lostPhoneId',
      populate: { path: 'reportedBy', select: 'name reputation verified' }
    })
    .populate({
      path: 'foundPhoneId',
      populate: { path: 'reportedBy', select: 'name reputation verified' }
    })
    .sort({ createdAt: -1 });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get match by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate({
        path: 'lostPhoneId',
        populate: { path: 'reportedBy', select: 'name reputation verified' }
      })
      .populate({
        path: 'foundPhoneId',
        populate: { path: 'reportedBy', select: 'name reputation verified' }
      });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Check if user is involved in this match
    const userPhones = await Phone.find({ reportedBy: req.user._id });
    const phoneIds = userPhones.map(phone => phone._id.toString());
    
    const isInvolved = phoneIds.includes(match.lostPhoneId._id.toString()) || 
                      phoneIds.includes(match.foundPhoneId._id.toString());

    if (!isInvolved) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify match
router.post('/:id/verify', auth, async (req, res) => {
  try {
    const { verificationCode } = req.body;
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Check if user owns the lost phone
    const lostPhone = await Phone.findById(match.lostPhoneId);
    if (lostPhone.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only the owner can verify the match' });
    }

    // Generate verification code if not provided
    if (!match.verificationCode) {
      match.verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      await match.save();
    }

    // Verify the code
    if (verificationCode && verificationCode.toUpperCase() === match.verificationCode) {
      match.status = 'verified';
      match.verifiedAt = new Date();
      await match.save();

      // Update phone statuses
      await Phone.findByIdAndUpdate(match.lostPhoneId, { 
        status: 'resolved',
        matchedWith: match.foundPhoneId
      });
      await Phone.findByIdAndUpdate(match.foundPhoneId, { 
        status: 'resolved',
        matchedWith: match.lostPhoneId
      });

      res.json({
        message: 'Match verified successfully',
        match
      });
    } else {
      res.json({
        message: 'Verification code sent',
        verificationCode: match.verificationCode
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject match
router.post('/:id/reject', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Check if user owns the lost phone
    const lostPhone = await Phone.findById(match.lostPhoneId);
    if (lostPhone.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only the owner can reject the match' });
    }

    match.status = 'rejected';
    match.rejectedReason = reason || 'Not my phone';
    await match.save();

    res.json({
      message: 'Match rejected',
      match
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;