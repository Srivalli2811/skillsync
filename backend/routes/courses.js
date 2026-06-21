const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// READ — get all courses for logged in user only
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.userId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE — add a new course
router.post('/', async (req, res) => {
  try {
    const course = new Course({
      userId: req.userId,
      name: req.body.name,
      platform: req.body.platform,
      status: req.body.status || 'active',
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE — update a course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE — remove a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;