const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  temp: Number,
  smoke: Number,
  speed: Number
},
  { strict: false }
);

let Data = mongoose.model('Data', dataSchema);

module.exports = Data;
