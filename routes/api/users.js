const express = require('express');
const { addUser } = require('../../service/usersMongo');
const { newUserJoiValidation } = require('../../service/usersJoi');
const { passwordHashBcypt } = require('../../service/bcrypt');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { password, email } = req.body;

  try {
    await newUserJoiValidation(password, email);
    try {
      const hashedPassword = await passwordHashBcypt(password);
      const contact = await addUser(hashedPassword, email);
      res.status(201).json(contact);
    } catch (err) {
      res.status(409).json({ message: 'Email in use' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router