const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  caloriesBurned: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
