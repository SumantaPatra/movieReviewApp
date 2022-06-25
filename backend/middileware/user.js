const { isValidObjectId } = require("mongoose");
const resetPasswordToken = require("../models/resetPasswordToken");
const { sendError } = require("../utils/helper");

exports.verifyResetPass = async (req, res, next) => {
  const { token, userId } = req.body;
  if (!token.trim() || !isValidObjectId(userId)) {
    return sendError(res, "Invalid Request!");
  }
  const resetToken = await resetPasswordToken.findOne({ owner: userId });
  if (!resetToken) {
    return sendError(res, "Invalid ascess");
  }

  const isMatched = await resetToken.compaireToken(token);
  if (!isMatched) {
    sendError(res, "invalid access");
  }

  req.resetToken = resetToken;
  next();
};
