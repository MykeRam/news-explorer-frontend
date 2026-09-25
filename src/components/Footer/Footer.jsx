import './Footer.css'
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
          <a className="footer__link" href="/">
            Home
          </a>
          <a
            className="footer__link"
            href="https://tripleten.com/"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>
          <a
            className="footer__social-link"
            href="https://github.com/MykeRam"
            target="_blank"
            rel="noreferrer"
            aria-label="Michael Ramirez on GitHub"
          >
            <img className="footer__social-icon" src={githubIcon} alt="" />
          </a>
          <a
            className="footer__social-link"
            href="https://www.linkedin.com/in/michaelramirezz/"
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
