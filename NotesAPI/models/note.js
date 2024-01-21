const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [50,'Title cannot be more than 50 words']
  },
  content: {
    type: String,
    require: true
  },
  includedTags: [
    {
      tagName: {
        type: String
      },
      color: {
        type: String
      }
    }
  ],
  isPin: {
    type: Boolean
  },
  addedData: {
    type: Date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

module.exports = mongoose.model('Note',notesSchema)