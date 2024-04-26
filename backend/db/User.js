const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required!"],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    index: { unique: true },
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },

  password: {
    type: String,
    required: [true, "Password Field is requied"],
    index: { unique: true },
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "Password is not strong [At least 1-uppercase,1-lowercase,numbers and one special character]"
        );
      }
    },
  },
});

module.exports = mongoose.model("users", userSchema);
