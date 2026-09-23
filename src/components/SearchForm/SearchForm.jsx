import './SearchForm.css'

function SearchForm() {
  return (
    <section className="search-form" aria-labelledby="search-form-title">
      <h1 className="search-form__title" id="search-form-title">
        What&apos;s going on in the world?
      </h1>
      <p className="search-form__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="search-form__form" name="news-search">
        <label className="search-form__label" htmlFor="news-search-input">
          Search news by topic
        </label>
        <input
          className="search-form__input"
          id="news-search-input"
          name="query"
          type="search"
          placeholder="Enter topic"
          required
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </form>
    </section>
  )
}

export default SearchForm
