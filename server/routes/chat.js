const express = require('express');
const Chat = require('../models/Chat');
const Phone = require('../models/Phone');
const auth = require('../middleware/auth');

const router = express.Router();

// Get chats for a user
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id
    })
    .populate('phoneId', 'brand model type')
    .populate('participants', 'name reputation verified')
    .sort({ lastActivity: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get or create chat for a phone
router.post('/phone/:phoneId', auth, async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.phoneId);
    
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      phoneId: req.params.phoneId,
      participants: { $all: [req.user._id, phone.reportedBy] }
    })
    .populate('phoneId', 'brand model type')
    .populate('participants', 'name reputation verified');

    if (!chat) {
      // Create new chat
      chat = new Chat({
        phoneId: req.params.phoneId,
        participants: [req.user._id, phone.reportedBy],
        messages: [{
          senderId: req.user._id,
          message: 'Hi! I\'m interested in this phone.',
          messageType: 'system'
        }]
      });

      await chat.save();
      await chat.populate('phoneId', 'brand model type');
      await chat.populate('participants', 'name reputation verified');
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('phoneId', 'brand model type')
      .populate('participants', 'name reputation verified')
      .populate('messages.senderId', 'name');

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(
      participant => participant._id.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Mark messages as read
    chat.messages.forEach(message => {
      if (message.senderId._id.toString() !== req.user._id.toString()) {
        message.read = true;
      }
    });

    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send message
router.post('/:id/messages', auth, async (req, res) => {
  try {
    const { message, messageType = 'text' } = req.body;
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(
      participant => participant.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Add message
    chat.messages.push({
      senderId: req.user._id,
      message,
      messageType
    });

    chat.lastActivity = new Date();
    await chat.save();

    // Populate the new message
    await chat.populate('messages.senderId', 'name');

    const newMessage = chat.messages[chat.messages.length - 1];

    res.json({
      message: 'Message sent successfully',
      chatMessage: newMessage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;