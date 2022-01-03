var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.post('/update', async (req, res) => {

  try {
    const { user_id, fieldName, fieldValue } = req.body;
    const oldUser = await User.findById(user_id);
    if (!oldUser)
      return res.status(401).send({ message: "User not found!" });

    // console.log("Old User:", oldUser);
    const result = await User.findByIdAndUpdate(user_id, { "$set": { [fieldName]: fieldValue } }, { new: true });
    // console.log("---------------Result------------", result);
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})


module.exports = router
