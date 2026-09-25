import './NewsCard.css'
import bookmarkIcon from '../../images/bookmark-icon.svg'

function NewsCard({ article }) {
  return (
    <article className="news-card">
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.imageAlt}
        />
        <div className="news-card__save-control">
          <span className="news-card__save-message">Sign in to save articles</span>
          <button
            className="news-card__save-button"
            type="button"
            aria-label={`Save ${article.title}`}
          >
            <img
              className="news-card__save-icon"
              src={bookmarkIcon}
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="news-card__content">
        <time className="news-card__date">{article.date}</time>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </article>
  )
}

export default NewsCard
