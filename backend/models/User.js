const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: false, required: true },
  fullName: { type: String, unique: false, required: true },
  password: { type: String, unique: false, required: true },
  avatar: {
    type: String,
    unique: false,
    default: "istockphoto-519078727-612x612.jpg",
  },
  followers: { type: Array, default: [] },
  followings: { type: Array, default: [] },
});

module.exports = model("User", User);
