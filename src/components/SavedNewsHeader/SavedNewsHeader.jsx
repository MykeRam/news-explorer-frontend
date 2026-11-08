import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import './SavedNewsHeader.css'
import { getKeywordSummary } from '../../utils/savedArticleSummary.js'

function SavedNewsHeader({ savedArticles }) {
  const currentUser = useContext(CurrentUserContext)
  const articleCount = savedArticles.length

  return (
    <section className="saved-news-header" aria-labelledby="saved-news-title">
      <p className="saved-news-header__eyebrow">Saved articles</p>
      <h1 className="saved-news-header__title" id="saved-news-title">
        {currentUser.name}, you have {articleCount} saved{' '}
        {articleCount === 1 ? 'article' : 'articles'}
      </h1>
      <p className="saved-news-header__keywords">
        {articleCount === 0
          ? 'Save articles from search results to see them here.'
          : <>By keywords: <strong>{getKeywordSummary(savedArticles)}</strong></>}
      </p>
    </section>
  )
}

export default SavedNewsHeader
