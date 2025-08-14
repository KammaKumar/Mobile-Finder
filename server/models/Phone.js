const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  imei: {
    type: String,
    trim: true,
    sparse: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  images: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['active', 'matched', 'resolved'],
    default: 'active'
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactInfo: {
    type: String,
    default: null
  },
  reward: {
    type: Number,
    min: 0,
    default: 0
  },
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'damaged'],
    default: 'good'
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  matchedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phone',
    default: null
  }
}, {
  timestamps: true
});

// Index for geospatial queries
phoneSchema.index({ 'location.lat': 1, 'location.lng': 1 });

// Index for text search
phoneSchema.index({ 
  brand: 'text', 
  model: 'text', 
  description: 'text',
  'location.address': 'text'
});

module.exports = mongoose.model('Phone', phoneSchema);