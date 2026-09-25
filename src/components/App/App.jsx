import './App.css'
import About from '../About/About.jsx'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx'

function App() {
  return (
    <div className="page">
      <section className="page__hero">
        <Header />
        <SearchForm />
      </section>
      <About />
      <Footer />
    </div>
  )
}

export default App
