import './Header.css'
import Navigation from '../Navigation/Navigation.jsx'

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <a className="header__logo" href="/" aria-label="NewsExplorer home">
          NewsExplorer
        </a>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
