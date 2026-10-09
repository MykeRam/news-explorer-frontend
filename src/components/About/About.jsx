import './About.css'
import authorPhoto from '../../images/author-michael-ramirez.webp'

function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__content">
        <img
          className="about__image"
          src={authorPhoto}
          alt="Portrait of Michael Ramirez"
        />
        <div className="about__description">
          <h2 className="about__title" id="about-title">
            About the author
          </h2>
          <p className="about__paragraph">
            I&apos;m Michael Ramirez, a software engineering student focused on
            building accessible, responsive web applications.
          </p>
          <p className="about__paragraph">
            News Explorer brings together the React, API, authentication, and
            deployment skills I developed throughout the TripleTen program.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
