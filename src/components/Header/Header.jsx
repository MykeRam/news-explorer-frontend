import { useContext, useEffect, useState } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import Navigation from '../Navigation/Navigation.jsx'

function Header({ theme = 'dark', onSignInClick, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentUser = useContext(CurrentUserContext)
  const { pathname } = useLocation()
  const userEmail = currentUser?.email

  useEffect(() => { setIsMenuOpen(false) }, [pathname, userEmail])

  useEffect(() => {
    if (!isMenuOpen) return undefined
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

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
          onClick={() => setIsMenuOpen(false)}
        >
          NewsExplorer
        </Link>
        <button
          className="header__menu-button"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="header__menu-line" />
          <span className="header__menu-line" />
        </button>
        <Navigation
          theme={theme}
          isOpen={isMenuOpen}
          onNavigate={() => setIsMenuOpen(false)}
          onSignInClick={handleSignInClick}
          onLogout={handleLogout}
        />
      </div>
    </header>
  )
}

export default Header
