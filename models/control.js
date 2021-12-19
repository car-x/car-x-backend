const mongoose = require('mongoose');

const controlSchema = mongoose.Schema({
  APIkey: String,
  userId: String,
  userName: String,
  controlName: String,
  controlType: String
}, { timestamps: true }
);

let Control = mongoose.model('control', controlSchema);

// let t = Control.create({
//   userId: '61bf7d8ba7a0be4e21e308ae',
//   userName: 'Debendu',
//   controlName: 'LED1',
//   APIkey: '61bf7d0ac38bacc0bfd0970c',
//   controlType: 'ON',
// }).then((res) =>
//   console.log(res)
// );
// let t = Control.find({ APIkey: '61bf7d0ac38bacc0bfd0970c' }).then((res) =>
//   console.log(res)
// );

module.exports = Control;
