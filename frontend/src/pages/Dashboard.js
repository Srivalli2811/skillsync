import { useContext } from 'react';
import CourseContext from '../CourseContext';
import CourseList from '../CourseList';
import StudyCalendar from '../StudyCalendar';
import AddCourseForm from '../AddCourseForm';

function Dashboard() {
  const { courses, loading, addCourse, deleteCourse, logSession, toggleStatus } = useContext(CourseContext);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#44445a' }}>
        Loading your courses...
      </div>
    );
  }

  return (
    <div>
      <AddCourseForm onAddCourse={addCourse} courses={courses} />
      <div className="dashboard">
        <CourseList
          courses={courses}
          onDeleteCourse={deleteCourse}
          onLogSession={logSession}
          onToggleStatus={toggleStatus}
        />
        <StudyCalendar courses={courses} />
      </div>
    </div>
  );
}

export default Dashboard;