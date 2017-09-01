const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
})

const User = mongoose.model("User", userSchema)
module.exports = User
