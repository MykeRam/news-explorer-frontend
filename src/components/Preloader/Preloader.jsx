import './Preloader.css'

function Preloader({ message = 'Searching for news...' }) {
  return (
    <section className="preloader" role="status" aria-live="polite">
      <div className="preloader__spinner" aria-hidden="true" />
      <p className="preloader__text">{message}</p>
    </section>
  )
}

export default Preloader
