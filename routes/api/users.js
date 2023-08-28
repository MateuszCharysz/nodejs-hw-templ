const express = require('express');
const {addUser} = require('../../service/usersMongo');
const {newContactJoiValidation} = require('../../service/usersJoi');



const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { password, email, subscription } = req.body;

  try {
    await newContactJoiValidation(password, email, subscription);
    const contact = await addUser(hashedPassword, email, subscription);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});