const mongoose = require('mongoose');

const arduinoSchema = mongoose.Schema({
  APIkey: String,
  led1: Boolean,
  led2: Boolean,
  led3: Boolean,
  led4: Boolean,
}, { timestamps: true }
);

let Arduino = mongoose.model('arduino', arduinoSchema);

// let t = Arduino.create({
//   led1: 'ON',
//   led2: 'OFF',
//   led3: 'OFF',
//   led4: 'OFF',
//   APIkey: '61bf7d0ac38bacc0bfd0970c',
// }).then((res) =>
//   console.log(res)
// );
// let t = control.find({ APIkey: '61bf7d0ac38bacc0bfd0970c' }).then((res) =>
//   console.log(res)
// );

module.exports = Arduino;
