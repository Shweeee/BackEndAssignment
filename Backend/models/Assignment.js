const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Make sure this corresponds to the 'User' model
    required: true,  // userId is required
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',  // Make sure this corresponds to the 'Admin' model
    required: true,  // adminID is also required
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

const Assignment = mongoose.model('assignments', assignmentSchema);

module.exports = Assignment;
