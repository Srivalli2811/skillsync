import { useState } from 'react';

function AddCourseForm(props) {
  const [status, setStatus] = useState('active');
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');

  function handleSubmit() {
    if (!name || !platform) {
      alert('Please fill in both fields!');
      return;
    }
    const isDuplicate = props.courses.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
      alert('This course already exists!');
      return;
    }
    props.onAddCourse({
      name: name,
      platform: platform,
      status: status,
    });
    setName('');
    setPlatform('');
    setStatus('active');
  }

  const inputStyle = {
    flex: 1,
    padding: '10px 14px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'Outfit, sans-serif',
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
    }}>
      <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '18px' }}>➕ Add a Course</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Course name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={e => setPlatform(e.target.value)}
          style={inputStyle}
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 24px',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          Add Courses
        </button>
      </div>
    </div>
  );
}

export default AddCourseForm;