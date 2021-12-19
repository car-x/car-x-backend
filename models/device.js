const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  name: String,
  email: String,
  phno: Number,
}, { timestamps: true }
);

let Device = mongoose.model('device', deviceSchema);

// let t = Device.create({
//   name: 'Debendu',
//   email: 'debendu@gmail.com',
//   phno: '9876543210'
// });
// console.log(t);

module.exports = Device;
