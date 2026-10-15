import './SavedNewsHeader.css'

function getKeywordSummary(savedArticles) {
  const keywords = [
    ...new Set(savedArticles.map((article) => article.keyword).filter(Boolean)),
  ]

  if (keywords.length === 0) {
    return 'Save articles from search results to see them here.'
  }

  if (keywords.length <= 3) {
    return `By keywords: ${keywords.join(', ')}`
  }

  return `By keywords: ${keywords.slice(0, 2).join(', ')}, and ${keywords.length - 2} other${keywords.length - 2 === 1 ? '' : 's'}`
}

function SavedNewsHeader({ currentUser, savedArticles }) {
  const articleCount = savedArticles.length

  return (
    <section className="saved-news-header" aria-labelledby="saved-news-title">
      <p className="saved-news-header__eyebrow">Saved articles</p>
      <h1 className="saved-news-header__title" id="saved-news-title">
        {currentUser.name}, you have {articleCount} saved{' '}
        {articleCount === 1 ? 'article' : 'articles'}
      </h1>
      <p className="saved-news-header__keywords">
        {getKeywordSummary(savedArticles)}
      </p>
    </section>
  )
}

export default SavedNewsHeader
