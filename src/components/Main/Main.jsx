import { useEffect, useState } from 'react'
import './Main.css'
import NewsCardList from '../NewsCardList/NewsCardList.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import notFoundIcon from '../../images/not-found-icon.svg'

const ARTICLES_PER_PAGE = 3

function Main({ articles, isLoading = false, hasSearched, searchError }) {
  const [visibleArticleCount, setVisibleArticleCount] = useState(
    ARTICLES_PER_PAGE,
  )

  useEffect(() => {
    setVisibleArticleCount(ARTICLES_PER_PAGE)
  }, [articles])

  const visibleArticles = articles.slice(0, visibleArticleCount)
  const hasMoreArticles = visibleArticleCount < articles.length

  const handleShowMore = () => {
    setVisibleArticleCount((currentCount) =>
      Math.min(currentCount + ARTICLES_PER_PAGE, articles.length),
    )
  }

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
            <NewsCardList articles={visibleArticles} />
            {hasMoreArticles && (
              <button
                className="main__show-more"
                type="button"
                onClick={handleShowMore}
              >
                Show more
              </button>
            )}
          </div>
        </section>
      )}
    </main>
  )
}

export default Main
