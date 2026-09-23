import './App.css'
import Header from '../Header/Header.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx'

function App() {
  return (
    <div className="page">
      <section className="page__hero">
        <Header />
        <SearchForm />
      </section>
    </div>
  )
}

export default App
