import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import AuthContext from './AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleLogout() {
    setShowLogoutConfirm(true);
    setDropdownOpen(false);
  }

  function confirmLogout() {
    logout();
    navigate('/login');
  }

  function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const dropdownRef = useRef(null);

useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }
  document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>SkillSync</h1>
          <p>Your personal learning dashboard</p>
        </div>
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </Link>
          <Link to="/stats" className={location.pathname === '/stats' ? 'nav-link active' : 'nav-link'}>
            Stats
          </Link>

          {/* Profile Avatar */}
          <div className="profile-wrapper" ref={dropdownRef}>
            <div
              className="profile-avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {getInitials(user?.name)}
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="profile-dropdown">
                {/* User Info */}
                <div className="dropdown-header">
                  <div className="dropdown-avatar">{getInitials(user?.name)}</div>
                  <div>
                    <p className="dropdown-name">{user?.name}</p>
                    <p className="dropdown-email">{user?.email}</p>
                  </div>
                </div>

                <div className="dropdown-divider" />

                {/* Change Password */}
                <button
                  className="dropdown-item"
                  onClick={() => { navigate('/change-password'); setDropdownOpen(false); }}
                >
                  🔑 Change Password
                </button>

                {/* Theme Toggle */}
                <button className="dropdown-item" onClick={toggleTheme}>
                  {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>

                <div className="dropdown-divider" />

                {/* Logout */}
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Logout?</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
              <button className="modal-confirm" onClick={confirmLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;