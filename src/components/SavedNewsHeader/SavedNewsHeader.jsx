import './SavedNewsHeader.css'

function SavedNewsHeader() {
  return (
    <section className="saved-news-header" aria-labelledby="saved-news-title">
      <p className="saved-news-header__eyebrow">Saved articles</p>
      <h1 className="saved-news-header__title" id="saved-news-title">
        Your saved articles will appear here.
      </h1>
    </section>
  )
}

export default SavedNewsHeader
