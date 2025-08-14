const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  lostPhoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phone',
    required: true
  },
  foundPhoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phone',
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  matchingFactors: [{
    factor: {
      type: String,
      enum: ['brand', 'model', 'color', 'imei', 'location', 'image', 'description']
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  verificationCode: {
    type: String,
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  },
  rejectedReason: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);