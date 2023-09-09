const nodemailer = require('nodemailer');
require('dotenv').config();

const config = {
  host: process.env.MAILTRAP_SERW,
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
};

const transporter = nodemailer.createTransport(config)

module.exports = {transporter}