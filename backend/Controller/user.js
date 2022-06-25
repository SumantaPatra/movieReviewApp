const User = require("../models/user");
const emailVerificationToken = require("../models/emailVerificationToken");
const resetPasswordToken = require("../models/resetPasswordToken");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
const { json } = require("express");
const { generateOtp, createNodemail } = require("../utils/mail");
const { sendError, generateRandomBytes } = require("../utils/helper");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
exports.create = async (req, res) => {
  const { name, password, email } = req.body;
  const newUser = new User({ name, email, password });
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return sendError(res, "This Email is already in user");
  }
  await newUser.save();

  let OTP = generateOtp();

  const newEmailVerificationToken = await emailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = createNodemail();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email verification token",
    html: `<p>your verification Otp</p>
    <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
};
exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  // check if userId Validation

  if (!isValidObjectId(userId)) {
    return sendError(res, "Invalid User");
  }
  const user = await User.findById(userId);
  if (!user) return sendError(res, 404, "user Not Found!");
  if (user.isVerified) return sendError(res, "user is already Verified");
  const token = await emailVerificationToken.findOne({ owner: userId });
  console.log(token);
  // console.log(token.schema.methods.compaireToken);
  if (!token) return sendError(res, "token not Found");
  const isMatched = await token.compaireToken(OTP);
  if (!isMatched) return sendError(res, "please submit a valid Otp");

  user.isVerified = true;
  await user.save();

  await emailVerificationToken.findByIdAndDelete(token._id);

  var transport = createNodemail();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email verification ",
    html: `<p>your verification Completed</p>
   
    `,
  });

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, token: jwtToken },
    message: "Email Verified successfully Completed",
  });
};

exports.resendEmailVerification = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, "user not Found");
  }
  if (user.isVerified) {
    return sendError(res, "Email is already verified");
  }
  const token = await emailVerificationToken.findOne({ owner: userId });
  if (token) {
    return sendError(res, "Try after one Hour for verification");
  }

  let OTP = generateOtp();

  const newEmailVerificationToken = new emailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = createNodemail();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email verification token",
    html: `<p>your verification Otp</p>
    <h1>${OTP}</h1>
    `,
  });
  return res.json({ message: "Otp has been sent to your email" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) sendError(res, "email is Missing");
  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 404, "user not Found");
  }
  const alreadyHasToken = await resetPasswordToken.findOne({ owner: user._id });
  if (alreadyHasToken) {
    return sendError(res, "reset password after one Hour");
  }
  const token = await generateRandomBytes();
  const newPasswordToken = await resetPasswordToken({
    owner: user._id,
    token,
  });
  await newPasswordToken.save();
  const resetPasswordlink = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;
  var transport = createNodemail();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "reset Password token",
    html: `<a href=${resetPasswordlink}>Click here to reset Password</>
    `,
  });
  return res.json({ message: "Link has been sent to Your mail" });
};
exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(
      res,
      "The new password must be different from the old one!"
    );

  user.password = newPassword;
  await user.save();

  await resetPasswordToken.findByIdAndDelete(req.resetToken._id);

  const transport = createNodemail();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
      <h1>Password Reset Successfully</h1>
      <p>Now you can use new password.</p>

    `,
  });

  res.json({
    message: "Password reset successfully, now you can use new password.",
  });
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/password doesnot match");
  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "Email/password doesnot match");

  const { _id, name } = user;

  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
  res.json({ user: { id: _id, name, email, token: jwtToken } });
};
