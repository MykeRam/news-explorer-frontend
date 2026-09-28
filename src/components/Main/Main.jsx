import './Main.css'
import NewsCardList from '../NewsCardList/NewsCardList.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import notFoundIcon from '../../images/not-found-icon.svg'

function Main({ articles, isLoading = false, hasSearched, searchError }) {
  if (!hasSearched) {
    return <main className="main" />
  }

  return (
    <main className="main">
      {isLoading ? (
        <Preloader />
      ) : searchError ? (
        <section className="main__status" role="alert">
          <p className="main__error">{searchError}</p>
        </section>
      ) : articles.length === 0 ? (
        <section
          className="main__status"
          aria-labelledby="nothing-found-title"
        >
          <img
            className="main__status-icon"
            src={notFoundIcon}
            alt=""
          />
          <h2 className="main__status-title" id="nothing-found-title">
            Nothing found
          </h2>
          <p className="main__status-text">
            Sorry, but nothing matched your search terms.
          </p>
        </section>
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
