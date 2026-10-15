import './Navigation.css'
import { NavLink } from 'react-router-dom'

function Navigation({
  theme = 'dark',
  isOpen = false,
  onNavigate,
  currentUser,
  onSignInClick,
  onLogout,
}) {
  const getLinkClassName = ({ isActive }) =>
    `navigation__link${isActive ? ' navigation__link_active' : ''}`

  return (
    <nav
      className={`navigation navigation_theme_${theme}${isOpen ? ' navigation_open' : ''}`}
      aria-label="Main navigation"
    >
      <NavLink className={getLinkClassName} to="/" end onClick={onNavigate}>
        Home
      </NavLink>
      {currentUser && (
        <NavLink
          className={getLinkClassName}
          to="/saved-news"
          onClick={onNavigate}
        >
          Saved articles
        </NavLink>
      )}
      <button
        className={`navigation__sign-in${currentUser ? ' navigation__sign-in_authenticated' : ''}`}
        type="button"
        aria-label={currentUser ? `Sign out ${currentUser.name}` : 'Sign in'}
        onClick={currentUser ? onLogout : onSignInClick}
      >
        <span>{currentUser ? currentUser.name : 'Sign in'}</span>
        {currentUser && (
          <svg
            className="navigation__sign-out-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M10 17l5-5-5-5M15 12H3" />
            <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
          </svg>
        )}
      </button>
    </nav>
  )
}

export default Navigation
