const mongoose = require("mongoose");
const validator = require('validator')
const waitListSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please enter your first name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, "Please provide an email"],
  },
  createdAt: { 
    type: Date, 
    default: Date.now()
  }
});
waitListSchema.index({ createdAt: 1 });
const WaitList = mongoose.model("WaitList", waitListSchema)
module.exports = WaitList