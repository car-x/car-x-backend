const mongoose = require('mongoose');

const arduinoControlSchema = mongoose.Schema({
  APIkey: String,
  led1: Boolean,
  led2: Boolean,
  led3: Boolean,
  led4: Boolean,
}, { timestamps: true }
);

let ArduinoControl = mongoose.model('arduinoControl', arduinoControlSchema);

// let t = ArduinoControl.create({
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

module.exports = ArduinoControl;
