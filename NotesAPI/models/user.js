const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  noteId: [
    {type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'}
  ],
  refreshToken: {
    type: String
  }
});

module.exports = mongoose.model('User',userSchema);