import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  const handleQueryChange = (event) => {
    setQuery(event.target.value)

    if (validationMessage) {
      setValidationMessage('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setValidationMessage('Please enter a keyword')
      return
    }

    setValidationMessage('')
    onSearch(trimmedQuery).catch(() => {})
  }

  return (
    <section className="search-form" aria-labelledby="search-form-title">
      <h1 className="search-form__title" id="search-form-title">
        What&apos;s going on in the world?
      </h1>
      <p className="search-form__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form
        className="search-form__form"
        name="news-search"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="search-form__label" htmlFor="news-search-input">
          Search news by topic
        </label>
        <input
          className="search-form__input"
          id="news-search-input"
          name="query"
          type="search"
          placeholder="Enter topic"
          value={query}
          aria-describedby={
            validationMessage ? 'news-search-error' : undefined
          }
          aria-invalid={Boolean(validationMessage)}
          onChange={handleQueryChange}
          required
        />
        {validationMessage && (
          <span
            className="search-form__error"
            id="news-search-error"
            role="alert"
          >
            {validationMessage}
          </span>
        )}
        <button className="search-form__button" type="submit">
          Search
        </button>
      </form>
    </section>
  )
}

export default SearchForm
