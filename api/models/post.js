const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  content: {
    type: Object,
    required: [true, 'Content required'],
  },
  user: {
    type: String,
    required: [true, 'User Id required'],
  },
  likes: {
    type: Number,
  },
  saves: {
    type: Number,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('posts', postSchema);
