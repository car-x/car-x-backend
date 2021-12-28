var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')


const secret = 'wearecarxanditisoursecretkey';

router.post('/', async (req, res, next) => {

  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email, password });
    if (!oldUser)
      return res.status(401).send({ message: "Check Email Id or Password!" });
    const token = jwt.sign({ id: oldUser._id, APIkey: oldUser.APIkey }, secret);

    res.status(200).json({ user: oldUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = router
