const mongoose = require('mongoose');

const arduinoSchema = mongoose.Schema({
  APIkey: String,
  led1: Boolean,
  led2: Boolean,
  led3: Boolean,
  sm1: Number,
}, { timestamps: true }
);

let Arduino = mongoose.model('arduino', arduinoSchema);

// let t = Arduino.create({
//   led1: true,
//   led2: true,
//   led3: true,
//   sm1: 10,
//   APIkey: '61bf7d0ac38bacc0bfd0970c',
// }).then((res) =>
//   console.log(res)
// );
// let t = control.find({ APIkey: '61bf7d0ac38bacc0bfd0970c' }).then((res) =>
//   console.log(res)
// );

module.exports = Arduino;
