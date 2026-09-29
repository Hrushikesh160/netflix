import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { notify } from '../common/Toast';

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Movies', to: '/movies' },
  { label: 'TV Shows', to: '/tv-shows' },
  { label: 'My List', to: '/watchlist' },
  { label: 'Search', to: '/search' },
];

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => setShowProfileMenu(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowProfileMenu(false);
    navigate('/login');
    notify('You have been logged out.', 'info');
  };

  return (
    <header className="topbar">
      <div className="container nav-inner">
        <div className="nav-left">
          <Link to={isAuthenticated ? '/home' : '/'} className="brand" aria-label="StreamFlix home">
            StreamFlix
          </Link>
          <nav className={`nav-links ${isMobileOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="nav-actions">
          <Link to="/search" className="icon-button" aria-label="Search">⌕</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-cta">Login</Link>
              <Link to="/signup" className="nav-cta primary">Sign up</Link>
            </>
          ) : (
            <div className="profile-menu-wrapper" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="avatar-button" onClick={() => setShowProfileMenu((value) => !value)}>
                {user?.name?.charAt(0) || 'U'}
              </button>
              {showProfileMenu ? (
                <div className="profile-menu">
                  <Link to="/profile">Profile</Link>
                  <Link to="/settings">Account</Link>
                  <Link to="/settings">Settings</Link>
                  <Link to="/watchlist">My List</Link>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
          <button type="button" className="mobile-menu-toggle" aria-label="Toggle menu" onClick={() => setIsMobileOpen((value) => !value)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
