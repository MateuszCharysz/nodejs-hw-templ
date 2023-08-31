const {
  addUser,
  findUserByMail,
  setJwtInDb,

} = require('../service/usersMongo');
const {
  newUserJoiValidation,
  logUserJoiValidation,
} = require('../service/usersJoi');
const {
  passwordHashBcypt,
  passwordCompareBcrypt,
} = require('../service/bcrypt');
const { createToken } = require('../service/jwtCreation');

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

const logIn = async (req, res, next) => {
  console.log(req);
  const { password, email } = req.body;
  try {
    await logUserJoiValidation(password, email);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  try {
    const user = await findUserByMail(email);
    const isPassCorrect = await passwordCompareBcrypt(password, user.password);
    if (user && isPassCorrect) {
      const id = user._id.toString();
      const payload = { id: id };
      const token = createToken(payload);
      const newToken = { token: token };
      const setToken = await setJwtInDb(id, newToken);
      return res.json({
        token: setToken.token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      throw new Error('Wrong password');
    }
  } catch (err) {
    return res.status(401).json({ message: 'Email or password is wrong' });
  }
};

const logOut = async (req, res, next) => {
  console.log(req);

  res.json({ message: 'it works' });
};

module.exports = { signUp, logIn, logOut };
