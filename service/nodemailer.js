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
    text: `Hello, below is verification mail for node serwer. 
    <a href="http://localhost:3000/api/users/verify/${verificationToken}">Verification link</a>
    `,
  };
  return email;
};

const sendVerificationEmail = async (reciver, verificationToken) =>
  await transporter
    .sendMail(emailOptions(reciver, verificationToken))
    .then(info => console.log(info))
    .catch(err => console.log(err));

module.exports = { sendVerificationEmail };
