import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import API_BASE from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate('/');

    } catch (err) {
      setError('Something went wrong. Try again!');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#080810',
    }}>
      <div style={{
        background: '#10101e',
        border: '1px solid #1e1e35',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ color: '#6c63ff', fontSize: '24px', marginBottom: '8px' }}>SkillSync</h1>
        <p style={{ color: '#44445a', fontSize: '14px', marginBottom: '32px' }}>Welcome back! Login to continue.</p>

        {error && (
          <div style={{
            background: '#2a1010',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            padding: '12px',
            color: '#ff6b6b',
            fontSize: '13px',
            marginBottom: '20px',
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#8888aa', fontSize: '12px', display: 'block', marginBottom: '6px' }}>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={{
              width: '100%',
              background: '#080810',
              border: '1px solid #1e1e35',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#e8e6f0',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#8888aa', fontSize: '12px', display: 'block', marginBottom: '6px' }}>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              background: '#080810',
              border: '1px solid #1e1e35',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#e8e6f0',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            background: '#6c63ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ color: '#44445a', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: '#6c63ff', cursor: 'pointer' }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;