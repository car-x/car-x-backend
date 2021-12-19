const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  APIkey: String,
  temp: Number,
  speed: Number,
  time: { type: String, default: new Date().toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }) }
},
  { strict: false, timestamps: true }
);

let Data = mongoose.model('Data', dataSchema);

let length = 0;
// let l = Data.find({ APIkey: '61bf44d552dd0cf6d898f46f' }).then((res) =>
//   length = res.length
// );
// setInterval(() => {
//   console.log("Data Number: " + ++length);
//   let t = Data.create({
//     temp: Math.floor(Math.random() * 50) + 20,
//     speed: Math.floor(Math.random() * 50) + 20,
//     APIkey: '61bf7d0ac38bacc0bfd0970c',
//     time: new Date().toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })
//   }).then((res) =>
//     console.log(res)
//   );
// }, 10000);

// let t = Data.deleteMany({}).then((res) =>
//   console.log(res.length)
// );
module.exports = Data;
