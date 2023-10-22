const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'name is required'], 
    trim: true,
    maxlength: [50,'name cant be more than 50 letter']
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', taskSchema)