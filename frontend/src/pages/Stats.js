import { useContext } from 'react';
import CourseContext from '../CourseContext';

function Stats() {
  const { courses } = useContext(CourseContext);

  const totalSessions = courses.reduce(
    (sum, c) => sum + c.totalSessions,
    0
  );

  const totalCourses = courses.length;

  const activeCourses = courses.filter(
    c => c.status === 'active'
  ).length;

  const bestStreak = Math.max(
    0,
    ...courses.map(c => c.maxStreak)
  );

  const cardStyle = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
  };

  const labelStyle = {
    color: 'var(--text-secondary)',
    fontSize: '12px',
    marginBottom: '8px',
  };

  return (
    <div>
      <h2
        style={{
          color: 'var(--text-primary)',
          fontSize: '15px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '24px',
        }}
      >
        📊 Stats
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <div style={cardStyle}>
          <p style={labelStyle}>TOTAL SESSIONS</p>

          <h3
            style={{
              fontSize: '36px',
              fontWeight: '700',
              color: 'var(--accent)',
            }}
          >
            {totalSessions}
          </h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>TOTAL COURSES</p>

          <h3
            style={{
              fontSize: '36px',
              fontWeight: '700',
              color: 'var(--text-primary)',
            }}
          >
            {totalCourses}
          </h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>ACTIVE COURSES</p>

          <h3
            style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#3ddc84',
            }}
          >
            {activeCourses}
          </h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>BEST STREAK</p>

          <h3
            style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#f5a623',
            }}
          >
            {bestStreak} days
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;