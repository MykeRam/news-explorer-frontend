import { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation.jsx'

function Header({ theme = 'dark', currentUser, onSignInClick, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignInClick = () => {
    setIsMenuOpen(false)
    onSignInClick()
  }

  const handleLogout = () => {
    setIsMenuOpen(false)
    onLogout()
  }

  return (
    <header
      className={`header header_theme_${theme}${isMenuOpen ? ' header_menu_open' : ''}`}
    >
      <div className="header__content">
        <Link
          className="header__logo"
          to="/"
          aria-label="NewsExplorer home"
        >
          NewsExplorer
        </Link>
        <button
          className="header__menu-button"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="header__menu-line" />
          <span className="header__menu-line" />
        </button>
        <Navigation
          theme={theme}
          isOpen={isMenuOpen}
          onNavigate={() => setIsMenuOpen(false)}
          currentUser={currentUser}
          onSignInClick={handleSignInClick}
          onLogout={handleLogout}
        />
      </div>
    </header>
  )
}

export default Header
