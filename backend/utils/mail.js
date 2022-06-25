const nodemailer = require("nodemailer");
exports.generateOtp = (length = 6) => {
  let OTP = "";
  for (let i = 1; i <= length; i++) {
    OTP += Math.round(Math.random() * 9);
  }
  return OTP;
};
exports.createNodemail = () => {
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODE_MAIL_USER,
      pass: process.env.NODE_MAIL_PASS,
    },
  });
};
