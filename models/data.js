const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  temp: Number,
  smoke: Number,
  speed: Number,
  time: { type: Date, default: Date.now }
},
  { strict: false }
);

let Data = mongoose.model('Data', dataSchema);

module.exports = Data;
