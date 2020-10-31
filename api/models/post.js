const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  content: {
    type: Object,
    required: [true, 'Content required'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, 'User Id required'],
  },
  likes: {
    type: Number,
  },
  saves: {
    type: Number,
  },
  creationDate: {
    type: Number,
    default: Date(),
  },
});

module.exports = mongoose.model('posts', postSchema);
