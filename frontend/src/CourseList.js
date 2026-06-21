import './CourseList.css';

function CourseList(props) {
  return (
    <div className="courses-section">
      <h2>📚 My Courses</h2>

      {props.courses.length === 0 ? (
        <p className="empty-state">No courses yet. Add one above! 👆</p>
      ) : (
        props.courses.map(course => (
          <div key={course._id} className="course-card">
            <div className="card-top">
              <span className="course-name">{course.name}</span>
              <span
                className={`status-badge ${course.status === 'active' ? 'status-active' : 'status-paused'}`}
                onClick={() => props.onToggleStatus(course._id)}
              >
                {course.status}
              </span>
            </div>

            <p className="course-platform">{course.platform}</p>

            <div className="stats-row">
              <span className="stat stat-streak">🔥 {course.streak} days</span>
              <span className="stat stat-max">⭐ {course.maxStreak} max</span>
              <span className="stat stat-sessions">📚 {course.totalSessions} sessions</span>
            </div>

            <div className="card-buttons">
              {course.status === 'active' && (
                <button className="btn-log" onClick={() => props.onLogSession(course._id)}>
                  Log Session
                </button>
              )}
              <button className="btn-remove" onClick={() => props.onDeleteCourse(course._id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CourseList;