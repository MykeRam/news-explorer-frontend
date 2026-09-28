import './SavedNews.css'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import NewsCardList from '../NewsCardList/NewsCardList.jsx'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.jsx'

function SavedNews({
  currentUser,
  onSignInClick,
  onLogout,
  savedArticles,
  pendingArticleUrls,
  onToggleSave,
}) {
  return (
    <div className="saved-news">
      <Header
        theme="light"
        currentUser={currentUser}
        onSignInClick={onSignInClick}
        onLogout={onLogout}
      />
      <main className="saved-news__content">
        <SavedNewsHeader
          currentUser={currentUser}
          savedArticles={savedArticles}
        />
        {savedArticles.length > 0 && (
          <section
            className="saved-news__results"
            aria-label="Saved article cards"
          >
            <div className="saved-news__results-content">
              <NewsCardList
                articles={savedArticles}
                isLoggedIn
                savedArticles={savedArticles}
                pendingArticleUrls={pendingArticleUrls}
                onToggleSave={onToggleSave}
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default SavedNews
