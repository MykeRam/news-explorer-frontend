import './Main.css'
import NewsCardList from '../NewsCardList/NewsCardList.jsx'
import Preloader from '../Preloader/Preloader.jsx'

function Main({ articles, isLoading = false }) {
  return (
    <main className="main">
      {isLoading ? (
        <Preloader />
      ) : (
        <section
          className="main__results"
          aria-labelledby="search-results-title"
        >
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
      )}
    </main>
  )
}

export default Main
