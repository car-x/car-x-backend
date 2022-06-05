var express = require('express');
var router = express.Router();
const Data = require('../models/data');
const Arduino = require('../models/arduino');
// const Control = require('../models/control');
// const Notification = require('../models/notification');
// const User = require('../models/user');
// const Device = require('../models/device');

// Sending data from arduino with query
router.get('/', async (req, res, next) => {

  try {
    const data = req.query;
    // console.table(data);
    const result = await Data.create(data);
    console.log('Database Response : ', result);
    const controlData = await Arduino.findOne({ APIkey: data.APIkey }).select('led1 led2 led3 sm1');
    // console.log('Database Response : ', controlData);

    req.io.sockets.to(data.APIkey).emit("new data", {
      _id: result._id,
      temp: result.temp,
      speed: result.speed,
      createdAt: result.createdAt,
      time: result.time
    });

    res.status(200).send(controlData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' })
  }

});

// getting all data
router.post('/fetch', async (req, res) => {

  try {
    const { APIkey } = req.body;
    const result = await Data.find({ APIkey }).select('temp speed createdAt time');
    // console.log('Database Response : ', result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }

});

// getting a perticular field data
// router.get('/fetch', async (req, res, next) => {

//   try {
//     const { data } = req.body;
//     console.log('data');
//     const result = await Data.find({}).select('time ' + data);
//     console.log('Database Response : ', result);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }

// });

module.exports = router;
