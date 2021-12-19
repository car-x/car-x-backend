const mongoose = require('mongoose');

const arduinoControlSchema = mongoose.Schema({
  APIkey: String,
  LED1: String,
  LED2: String,
  LED3: String,
  LED4: String,
}, { timestamps: true }
);

let ArduinoControl = mongoose.model('arduinoControl', arduinoControlSchema);

// let t = ArduinoControlSchema.create({
//   LED1: 'ON',
//   LED2: 'ON',
//   LED3: 'ON',
//   LED4: 'OFF',
//   APIkey: '61bf44d552dd0cf6d898f46f',
// }).then((res) =>
//   console.log(res)
// );
// let t = control.find({ APIkey: '61bf44d552dd0cf6d898f46f' }).then((res) =>
//   console.log(res)
// );

module.exports = ArduinoControl;
