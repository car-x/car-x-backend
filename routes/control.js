var express = require('express');
var router = express.Router();
const Control = require('../models/control');
const Arduino = require('../models/arduino');
const Notification = require('../models/notification');
// const Data = require('../models/data');
// const User = require('../models/user');
// const Device = require('../models/device');

// -------------helper functions--------------
const getControlName = (controlName) => {
  if (controlName === 'led1') return 'LED 1';
  if (controlName === 'led2') return 'LED 2';
  if (controlName === 'led3') return 'LED 3';
  if (controlName === 'led4') return 'LED 4';

  return 'Unknown';
}

const getControlStatus = (controlStatus) => {
  if (controlStatus) return 'ON';
  if (controlStatus === false) return 'OFF';

  return 'Unknown';
}
// --------------------------------------------

// Send control from frontend
router.post('/', async (req, res) => {
  try {
    const { APIkey, userId, userName, controlName, controlType } = req.body;
    const result = await Control.create({ APIkey, userId, userName, controlName, controlType });
    let message = '' + userName + ': ' + getControlName(controlName) + ' ' + getControlStatus(controlType);
    const noti = await Notification.create({ APIkey, type: 'info', message });
    const r = await Arduino.findOneAndUpdate({ APIkey: APIkey }, { "$set": { [controlName]: controlType } }, { new: true });

    req.io.sockets.to(APIkey).emit("new control", {
      controlName: controlName,
      controlType: controlType
    });

    req.io.sockets.to(APIkey).emit("new notification", noti);

    res.status(200).send(r);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all controls
router.post('/fetch', async (req, res) => {
  try {
    const { APIkey } = req.body;
    // console.log("API KEY: ", APIkey);
    const result = await Arduino.findOne({ APIkey: APIkey }).select('led1 led2 led3 led4');
    // console.log('Database Response : ', result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
