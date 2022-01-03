var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.post('/fetch', async (req, res) => {

  try {
    const { APIkey } = req.body;
    const data = await User.find({ APIkey });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

router.post('/change', async (req, res) => {

  try {
    const { owner_id, user_id, changeUserType } = req.body;
    const owner = await User.findById(owner_id);
    // console.log("---------------Owner------------", owner);
    if (!owner || owner.userType !== 'owner') {
      res.status(500).json({ message: 'You are not the Owner!' });
    }
    else {
      const result = await User.findByIdAndUpdate(user_id, { "$set": { userType: changeUserType } }, { new: true });
      // console.log("---------------Result------------", result);
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

router.post('/create', async (req, res) => {

  try {
    const { APIkey, name, email, password, phno, userType, owner_id } = req.body;
    const owner = await User.findById(owner_id);
    // console.log("---------------Owner------------", owner);
    if (!owner || owner.userType !== 'owner')
      return res.status(500).json({ message: 'You are not the Owner!' });

    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(400).send({ message: "Email Already In Use" });

    const result = await User.create({ APIkey, name, email, password, phno, userType });
    console.log("New User: ", result);
    res.status(201).json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = router
