var express = require('express');
var router = express.Router();
const Notification = require('../models/notification');
// const Data = require('../models/data');
// const Control = require('../models/control');
// const Arduino = require('../models/arduino');
// const User = require('../models/user');
// const Device = require('../models/device');

// Creating new notification
router.post('/', async (req, res) => {
  try {
    const { APIkey, type, message } = req.body;
    const result = await Notification.create({ APIkey, type, message });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all notifications
router.post('/fetch', async (req, res) => {
  try {
    const { APIkey } = req.body;
    const result = await Notification.find({ APIkey }).sort({ createdAt: -1 });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
