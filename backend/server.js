const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.log('MongoDB connection error:', error));

app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});