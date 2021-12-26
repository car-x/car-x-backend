var express = require('express');
var router = express.Router();
const Data = require('../models/data');
const Control = require('../models/control');
const Arduino = require('../models/arduino');
const Notification = require('../models/notification');
const User = require('../models/user');
const Device = require('../models/device');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Car-X' });
});

router.post('/test-socket', (req, res) => {
  try {
    const { message, APIkey } = req.body;
    console.log('Passed 1');
    req.io.sockets.emit("test message", message);
    console.log('Passed 1');

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
