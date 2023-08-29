const User = require('../models/user.schem');


const addUser = async (password, email, subscription) => {
  const user = await User.create({
    password: password,
    email: email,
    subscription: subscription
  });
  
  return user;
};

const findUserByMail = async email => await User.findOne({email}).lean();

// const user = new Schema({
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   subscription: {
//     type: String,
//     enum: ['starter', 'pro', 'business'],
//     default: 'starter',
//   },
//   token: {
//     type: String,
//     default: null,
//   },
// });

module.exports = {
addUser,
findUserByMail
};