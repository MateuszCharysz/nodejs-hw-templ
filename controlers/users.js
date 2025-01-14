const {
  addUser,
  findUserByMail,
  setJwtInDb,
  deleteJwtInDb,
  pathAvatarInDb,
  findUserByVerificationToken,
  setVerifyAndDeleteVerToken,
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

const { avatarUrl } = require('../service/gravatar');
const { jimpedAvatar } = require('../service/jimpAvatar');
const { tmpFolder, writeTmpFile } = require('../service/fileHandling');
const { nanoid } = require('nanoid');
const { sendVerificationEmail } = require('../service/nodemailer');

const signUp = async (req, res, next) => {
  const { password, email } = req.body;
  const avatar = avatarUrl(email);
  const verificationToken = nanoid();
  try {
    await newUserJoiValidation(password, email);
    try {
      const hashedPassword = await passwordHashBcypt(password);
      const user = await addUser(
        hashedPassword,
        email,
        avatar,
        verificationToken,
      );
      await sendVerificationEmail(user.email, user.verificationToken);
      return res.status(201).json({
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(409).json({ message: 'Email in use by Mongo' });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const logIn = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    await logUserJoiValidation(password, email);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  try {
    const user = await findUserByMail(email);
    const isPassCorrect = await passwordCompareBcrypt(password, user.password);
    if (user && isPassCorrect && user.verify) {
      const id = user._id.toString();
      const payload = { id: user._id };
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
      throw new Error('Wrong password or not verified');
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Email or password is wrong, or user not verified' });
  }
};

const logOut = async (req, res, next) => {
  const { _id } = req.user;
  await deleteJwtInDb(_id.toString());
  return res.status(204).end();
};

const current = (req, res, next) => {
  const { email, subscription } = req.user;
  return res.json({ email: email, subscription: subscription });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { originalname } = req.file;
  const finalFileName = `${nanoid()}_${originalname}`;
  const tmp = tmpFolder(originalname);
  try {
    await jimpedAvatar(tmp, 'tmp/' + originalname);
    await writeTmpFile(originalname, finalFileName);
    const saveUrl = `${req.url}/${finalFileName}`;
    const dbUrl = await pathAvatarInDb(_id, { avatarUrl: saveUrl });
    return res.json({ avatarUrl: dbUrl.avatarUrl });
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: 'Not authorized' });
  }
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await findUserByVerificationToken(verificationToken);
    if (user) {
      await setVerifyAndDeleteVerToken(verificationToken);
      return res.json({ message: 'Verification successful' });
    }
  } catch (err) {
    return res.status(404).json({ message: 'User not found' });
  }
};

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'missing required field email' });
  }
  try {
    const user = await findUserByMail(email);
    if (user.verify) {
      return res
        .status(400)
        .json({ message: 'Verification has already been passed' });
    } else {
      await sendVerificationEmail(user.email, user.verificationToken);
      return res.json({ message: 'Verification email sent' });
    }
  } catch (err) {}
  return res.status(500).json({ message: 'Failed to send verification email' });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  current,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
