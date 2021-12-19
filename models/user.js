const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  APIkey: String,
  name: String,
  email: String,
  password: String,
  phno: Number,
  userType: String
}, { timestamps: true }
);

let User = mongoose.model('user', userSchema);

// let t = User.create({
//   name: 'Debendu',
//   email: 'debendu@gmail.com',
//   phno: '9876543210',
//   password: 'debendu',
//   APIkey: '61bf7d0ac38bacc0bfd0970c',
//   userType: 'master'
// }).then((res) =>
//   console.log(res)
// );

// let t = User.find({ APIkey: '61bf7d0ac38bacc0bfd0970c' }).then((res) =>
//   console.log(res)
// );

module.exports = User;
