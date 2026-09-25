import './NewsCardList.css'
import NewsCard from '../NewsCard/NewsCard.jsx'

function NewsCardList({ articles }) {
  return (
    <ul className="news-card-list">
      {articles.map((article) => (
        <li className="news-card-list__item" key={article.id}>
          <NewsCard article={article} />
        </li>
      ))}
    </ul>
  )
}

export default NewsCardList
