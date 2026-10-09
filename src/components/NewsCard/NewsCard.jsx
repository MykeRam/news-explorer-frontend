import './NewsCard.css'

function NewsCard({
  article,
  isLoggedIn,
  isSaved,
  isSaving,
  isSavedPage = false,
  onToggleSave,
}) {
  const handleSaveClick = () => {
    if (isLoggedIn && !isSaving) {
      onToggleSave(article)
    }
  }

  return (
    <article className="news-card">
      {article.url && (
        <a
          className="news-card__link"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${article.title} in a new tab`}
        />
      )}
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.imageAlt}
        />
        {isSavedPage && article.keyword && (
          <span className="news-card__keyword">{article.keyword}</span>
        )}
        <div
          className={`news-card__save-control${isSavedPage ? ' news-card__save-control_remove' : ''}`}
        >
          {!isLoggedIn && !isSavedPage && (
            <span className="news-card__action-message">
              Sign in to save articles
            </span>
          )}
          {isSavedPage && (
            <span className="news-card__action-message">Remove from saved</span>
          )}
          <button
            className={`news-card__save-button${isSaved ? ' news-card__save-button_saved' : ''}${isSavedPage ? ' news-card__save-button_remove' : ''}`}
            type="button"
            aria-label={
              isSavedPage
                ? `Remove ${article.title} from saved articles`
                : `${isSaved ? 'Remove' : 'Save'} ${article.title}`
            }
            disabled={!isLoggedIn || isSaving}
            onClick={handleSaveClick}
          >
            {isSavedPage ? (
              <svg
                className="news-card__remove-icon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3" />
              </svg>
            ) : (
              <svg
                className="news-card__save-icon"
                width="14"
                height="19"
                viewBox="0 0 14 19"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1.5H13V17.5L7 13.8L1 17.5V1.5Z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            )}
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
