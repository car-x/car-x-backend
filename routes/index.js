var express = require('express');
var router = express.Router();
const Data = require('../models/data');
const Control = require('../models/control');
const ArduinoControl = require('../models/arduinoControl');
const Notification = require('../models/notification');
const User = require('../models/user');
const Device = require('../models/device');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Sending data from arduino with query
router.get('/data', async (req, res, next) => {

  try {
    const data = req.query;
    console.table(data);
    const result = await Data.create(data)
    console.log('Database Response : ', result);
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }

});

// getting all data
router.post('/fetch', async (req, res) => {

  try {
    const { APIkey } = req.body;
    const result = await Data.find({ APIkey })
    // console.log('Database Response : ', result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }

});

// getting a perticular field data
router.get('/fetch', async (req, res, next) => {

  try {
    const { data } = req.body;
    console.log('data');
    const result = await Data.find({}).select('time ' + data);
    console.log('Database Response : ', result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }

});

router.post('/arduinoControl', async (req, res) => {
  try {
    const { APIkey } = req.body;
    // console.log("API KEY: ", APIkey);
    const result = await ArduinoControl.findOne({ APIkey: APIkey }).select('led1 led2 led3 led4');
    console.log('Database Response : ', result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

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

router.post('/control', async (req, res) => {
  try {
    const { APIkey, userId, userName, controlName, controlType } = req.body;
    const result = await Control.create({ APIkey, userId, userName, controlName, controlType });
    console.log('PASSED 1', userName);
    let message = '' + userName + ': ' + getControlName(controlName) + ' ' + getControlStatus(controlType);
    console.log('PASSED 2');
    console.log(message);
    const noti = await Notification.create({ APIkey, type: 'info', message });
    const r = await ArduinoControl.findOneAndUpdate({ APIkey: APIkey }, { "$set": { [controlName]: controlType } }, { new: true });
    res.status(200).send(r);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/fetch/notification', async (req, res) => {
  try {
    const { APIkey } = req.body;
    const result = await Notification.find({ APIkey }).sort({ createdAt: -1 });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/data/notification', async (req, res) => {
  try {
    const { APIkey, type, message } = req.body;
    const result = await Notification.create({ APIkey, type, message });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
