const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'Must provided a description.'],
    minlength: [5, 'Description must have at least 5 characters'],
    maxlength: [30, 'Description cannot have more than 30 characters'],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  }
})

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;