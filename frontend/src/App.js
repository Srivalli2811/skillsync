import './App.css';
import Navbar from './Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseContext from './CourseContext';
import AuthContext from './AuthContext';
import useCourses from './useCourses';
import { useContext } from 'react';
import ChangePassword from './pages/ChangePassword';

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  const { courses, loading, addCourse, deleteCourse, logSession, toggleStatus } = useCourses();

  return (
    <CourseContext.Provider value={{ courses, loading, addCourse, deleteCourse, logSession, toggleStatus }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <ProtectedRoute>
            <div className="container">
              <Navbar />
              <Dashboard />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/stats" element={
          <ProtectedRoute>
            <div className="container">
              <Navbar />
              <Stats />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/change-password" element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } />
      </Routes>
    </CourseContext.Provider>
  );
}

export default App;