const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resetPasswordTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});
resetPasswordTokenSchema.pre("save", async function (next) {
  if (this.isModified) {
    this.token = await bcrypt.hash(this.token, 10);
  }
  next();
});
resetPasswordTokenSchema.methods.compaireToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

module.exports = mongoose.model("resetPasswordToken", resetPasswordTokenSchema);
