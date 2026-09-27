import './SavedNews.css'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.jsx'

function SavedNews({ onSignInClick }) {
  return (
    <div className="saved-news">
      <Header theme="light" onSignInClick={onSignInClick} />
      <main className="saved-news__content">
        <SavedNewsHeader />
      </main>
      <Footer />
    </div>
  )
}

export default SavedNews
