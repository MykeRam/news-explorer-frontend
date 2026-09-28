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
      <NavLink
        className={getLinkClassName}
        to="/saved-news"
        onClick={onNavigate}
      >
        Saved articles
      </NavLink>
      <button
        className="navigation__sign-in"
        type="button"
        aria-label={currentUser ? `Sign out ${currentUser.name}` : 'Sign in'}
        onClick={currentUser ? onLogout : onSignInClick}
      >
        {currentUser ? currentUser.name : 'Sign in'}
      </button>
    </nav>
  )
}

export default Navigation
