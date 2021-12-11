var express = require('express');
var router = express.Router();
const Data = require('../models/data');

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
router.get('/all', async (req, res, next) => {

  try {
    const result = await Data.find({})
    console.log('Database Response : ', result);
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }

});

// getting a perticular field data
router.get('/fetch', async (req, res, next) => {

  try {
    const { data } = req.body;
    const result = await Data.find({}).select(data);

    const dataSet = result.map(r => r[data]);
    console.log('Database Response : ', result);
    console.log('DataSet for ', data, ' : ', dataSet);
    res.status(200).send({ name: data, dataSet });
  } catch (error) {
    res.status(500).json(error);
  }

});

module.exports = router;
