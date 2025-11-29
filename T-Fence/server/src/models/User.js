const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  notification_token: { type: String, required: false },
  phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
