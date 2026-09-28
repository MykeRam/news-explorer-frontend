import './SavedNews.css'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.jsx'

function SavedNews({ currentUser, onSignInClick, onLogout }) {
  return (
    <div className="saved-news">
      <Header
        theme="light"
        currentUser={currentUser}
        onSignInClick={onSignInClick}
        onLogout={onLogout}
      />
      <main className="saved-news__content">
        <SavedNewsHeader />
      </main>
      <Footer />
    </div>
  )
}

export default SavedNews
