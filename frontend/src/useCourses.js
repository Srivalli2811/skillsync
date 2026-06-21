import { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import API_BASE from './config';

const API_URL = `${API_BASE}/courses`;

function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    fetch(API_URL, { headers: authHeaders })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching courses:', error);
        setLoading(false);
      });
  }, [token]);

  async function addCourse(newCourse) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(newCourse),
    });
    const savedCourse = await res.json();
    setCourses([...courses, savedCourse]);
  }

  async function deleteCourse(id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    setCourses(courses.filter(c => c._id !== id));
  }

  async function logSession(id) {
    const today = new Date().toDateString();
    const course = courses.find(c => c._id === id);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    let newStreak = course.streak;

    if (course.lastStudyDate === today) {
      const updated = { ...course, totalSessions: course.totalSessions + 1 };
      await updateCourse(id, updated);
      return;
    } else if (course.lastStudyDate === yesterdayString) {
      newStreak = course.streak + 1;
    } else {
      newStreak = 1;
    }

    const newMaxStreak = Math.max(course.maxStreak, newStreak);
    const newStudyDates = course.studyDates.includes(today)
      ? course.studyDates
      : [...course.studyDates, today];

    const updated = {
      ...course,
      streak: newStreak,
      totalSessions: course.totalSessions + 1,
      lastStudyDate: today,
      maxStreak: newMaxStreak,
      studyDates: newStudyDates,
    };
    await updateCourse(id, updated);
  }

  async function toggleStatus(id) {
    const course = courses.find(c => c._id === id);
    const updated = {
      ...course,
      status: course.status === 'active' ? 'paused' : 'active',
    };
    await updateCourse(id, updated);
  }

  async function updateCourse(id, updatedData) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(updatedData),
    });
    const updatedCourse = await res.json();
    setCourses(courses.map(c => c._id === updatedCourse._id ? updatedCourse : c));
  }

  return { courses, loading, addCourse, deleteCourse, logSession, toggleStatus };
}

export default useCourses;