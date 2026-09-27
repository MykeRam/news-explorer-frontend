import './Header.css'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation.jsx'

function Header({ theme = 'dark', onSignInClick }) {
  return (
    <header className={`header header_theme_${theme}`}>
      <div className="header__content">
        <Link
          className="header__logo"
          to="/"
          aria-label="NewsExplorer home"
        >
          NewsExplorer
        </Link>
        <Navigation theme={theme} onSignInClick={onSignInClick} />
      </div>
    </header>
  )
}

export default Header
