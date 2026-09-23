import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <a
        className="navigation__link navigation__link_active"
        href="/"
        aria-current="page"
      >
        Home
      </a>
      <button className="navigation__sign-in" type="button">
        Sign in
      </button>
    </nav>
  )
}

export default Navigation
