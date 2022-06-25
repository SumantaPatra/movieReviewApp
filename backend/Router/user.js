const express = require("express");
const router = express.Router();
const {
  create,
  forgetPassword,
  resetPassword,
  signIn,
} = require("../Controller/user");
const {
  userValidator,
  validate,
  signInValidator,
} = require("../middileware/userValidator");
const { verifyEmail } = require("../Controller/user");
const { resendEmailVerification } = require("../Controller/user");
const { verifyResetPass } = require("../middileware/user");
const { validatePassword } = require("../middileware/userValidator");
router.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1>`);
});

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification", resendEmailVerification);
router.post("/forget-password", forgetPassword);
router.post("/verify-reset-pass", verifyResetPass, (req, res) => {
  return res.json({ valid: true });
});
router.post(
  "/reset-pass",
  validatePassword,
  validate,
  verifyResetPass,
  resetPassword
);
router.post("/sign-in", signInValidator, validate, signIn);

module.exports = router;
