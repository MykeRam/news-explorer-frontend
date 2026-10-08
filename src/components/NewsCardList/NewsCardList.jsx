import './NewsCardList.css'
import NewsCard from '../NewsCard/NewsCard.jsx'

function NewsCardList({
  articles,
  isLoggedIn = false,
  savedArticles = [],
  pendingArticleUrls = [],
  onToggleSave,
  isSavedPage = false,
}) {
  return (
    <ul className="news-card-list">
      {articles.map((article) => {
        const isSaved = savedArticles.some(
          (savedArticle) => savedArticle.url === article.url,
        )

        return (
          <li className="news-card-list__item" key={article._id || article.id}>
            <NewsCard
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={isSaved}
              isSaving={pendingArticleUrls.includes(article.url)}
              isSavedPage={isSavedPage}
              onToggleSave={onToggleSave}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default NewsCardList
