const { addUser } = require('../service/usersMongo');
const { newUserJoiValidation } = require('../service/usersJoi');
const { passwordHashBcypt } = require('../service/bcrypt');

const signUp = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    await newUserJoiValidation(password, email);
    try {
      const hashedPassword = await passwordHashBcypt(password);
      const user = await addUser(hashedPassword, email);
      res.status(201).json({
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (err) {
      res.status(409).json({ message: 'Email in use by Mongo' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const logIn = async(req, res, next) =>{};

module.exports = { signUp, logIn };
