# SkillSync - Learning Management System

## Overview

SkillSync is a full-stack Learning Management System (LMS) designed to help students manage courses, track learning progress, and organize study activities through an interactive dashboard.

The platform provides user authentication, course management, progress tracking, and personalized learning features through a modern web interface.

## Features

* User Registration and Login Authentication
* Secure Protected Routes
* Course Management System
* Student Dashboard
* Course Enrollment and Tracking
* Study Calendar
* Learning Progress Monitoring
* Password Management
* Responsive User Interface
* RESTful API Integration

## Tech Stack

### Frontend

* React.js
* JavaScript
* CSS3
* React Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)

### Version Control

* Git
* GitHub

## Project Structure

```text
skillsync/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── components/
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Srivalli2811/skillsync.git
cd skillsync
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the backend directory and configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Future Enhancements

* Instructor Dashboard
* Course Creation and Management
* Video Lecture Support
* Assignment Submission
* Progress Analytics
* Certificate Generation
* Payment Gateway Integration
* Admin Panel

## Author

**Srivalli Patta**

Mechanical Engineering Student | Aspiring Software Engineer

GitHub: https://github.com/Srivalli2811
