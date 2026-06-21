const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'paused'],
    default: 'active',
  },
  streak: {
    type: Number,
    default: 0,
  },
  maxStreak: {
    type: Number,
    default: 0,
  },
  totalSessions: {
    type: Number,
    default: 0,
  },
  lastStudyDate: {
    type: String,
    default: null,
  },
  studyDates: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;