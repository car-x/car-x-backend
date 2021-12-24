const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  APIkey: String,
  type: String,
  message: String
}, { timestamps: true }
);

let Notification = mongoose.model('notification', notificationSchema);

// let t = Notification.create({
//   APIkey: '61bf7d0ac38bacc0bfd0970c',
//   message: 'Debendu: LED3 ON',
//   type: 'info'
// }).then((res) =>
//   console.log(res)
// );

// let t = Notification.find({ APIkey: '61bf7d0ac38bacc0bfd0970c' }).then((res) =>
//   console.log(res)
// );

module.exports = Notification;
