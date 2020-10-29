const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name required"],
  },
  title: {
    type: String,
    required: [true, "Title required"],
  },
  type: {
    type: Number,
    required: [true, "Type required"],
  },
});

module.exports = mongoose.model("users", userSchema);
