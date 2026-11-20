import './Footer.css'
import { Link } from 'react-router-dom'
import { EXTERNAL_LINKS } from '../../utils/config.js'
import githubIcon from '../../images/github-icon.svg'
import linkedinIcon from '../../images/linkedin-icon.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © {new Date().getFullYear()} NewsExplorer, Powered by News API
        </p>
        <nav className="footer__navigation" aria-label="Footer navigation">
          <Link className="footer__link" to="/">
            Home
          </Link>
          <a
            className="footer__link"
            href={EXTERNAL_LINKS.TRIPLETEN}
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>
          <a
            className="footer__social-link"
            href={EXTERNAL_LINKS.GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="Michael Ramirez on GitHub"
          >
            <img className="footer__social-icon" src={githubIcon} alt="" />
          </a>
          <a
            className="footer__social-link"
            href={EXTERNAL_LINKS.LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="Michael Ramirez on LinkedIn"
          >
            <img
              className="footer__social-icon footer__social-icon_type_linkedin"
              src={linkedinIcon}
              alt=""
            />
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
