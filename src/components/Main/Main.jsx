import './Main.css'
import NewsCardList from '../NewsCardList/NewsCardList.jsx'

function Main({ articles }) {
  return (
    <main className="main">
      <section className="main__results" aria-labelledby="search-results-title">
        <div className="main__content">
          <h2 className="main__title" id="search-results-title">
            Search results
          </h2>
          <NewsCardList articles={articles} />
          <button className="main__show-more" type="button">
            Show more
          </button>
        </div>
      </section>
    </main>
  )
}

export default Main
