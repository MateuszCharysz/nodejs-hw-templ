const nodemailer = require('nodemailer');
require('dotenv').config();

const config = {
  host: process.env.MAILTRAP_SERW,
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
};

const transporter = nodemailer.createTransport(config);
const emailOptions = (reciver, verificationToken) => {
  const email = {
    from: 'charyszek@interia.pl',
    to: `${reciver}`,
    subject: 'Node GOIT HW06',
    text: `Hello, below is verification link for node serwer. 
    http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `<p>Hello, <a href="http://localhost:3000/api/users/verify/${verificationToken}">here</a> is verification link for node serwer.</p>`,
  };
  return email;
};

const sendVerificationEmail = async (reciver, verificationToken) =>
  await transporter
    .sendMail(emailOptions(reciver, verificationToken))
    .then(info => console.log(info))
    .catch(err => console.log(err));

module.exports = { sendVerificationEmail };
