import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import About from '../About/About.jsx'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import LoginModal from '../LoginModal/LoginModal.jsx'
import Main from '../Main/Main.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.jsx'
import SavedNews from '../SavedNews/SavedNews.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx'
import { getNews } from '../../utils/newsApi.js'
import {
  checkToken,
  loginUser,
  registerUser,
} from '../../utils/mainApi.js'
import sitSpotImage from '../../images/article-sit-spot.jpg'

const SEARCH_ERROR_MESSAGE =
  'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'

const formatArticleDate = (publishedAt) => {
  const date = new Date(publishedAt)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatArticle = (article, index) => ({
  id: `${article.url || article.title}-${index}`,
  image: article.urlToImage || sitSpotImage,
  imageAlt: article.title
    ? `News article: ${article.title}`
    : 'News article image',
  date: formatArticleDate(article.publishedAt),
  title: article.title || 'Untitled article',
  description: article.description || '',
  source: article.source?.name || 'Unknown source',
  url: article.url || '',
})

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (!token) {
      setIsAuthChecking(false)
      return undefined
    }

    let isMounted = true

    checkToken(token)
      .then((user) => {
        if (isMounted) setCurrentUser(user)
      })
      .catch(() => localStorage.removeItem('jwt'))
      .finally(() => {
        if (isMounted) setIsAuthChecking(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleSignInClick = useCallback(() => setActiveModal('login'), [])
  const handleRegisterClick = () => setActiveModal('register')
  const handleCloseModal = () => setActiveModal(null)
  const handleLogin = (credentials) =>
    loginUser(credentials).then(({ token, user }) => {
      localStorage.setItem('jwt', token)
      setCurrentUser(user)
      handleCloseModal()
    })
  const handleRegister = (userData) => registerUser(userData)
  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setCurrentUser(null)
  }
  const handleSearch = (query) => {
    setHasSearched(true)
    setIsLoading(true)
    setSearchError('')
    setArticles([])

    return getNews(query)
      .then((data) => {
        setArticles(data.articles.map(formatArticle))
      })
      .catch(() => {
        setSearchError(SEARCH_ERROR_MESSAGE)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const homePage = (
    <>
      <section className="page__hero">
        <Header
          currentUser={currentUser}
          onSignInClick={handleSignInClick}
          onLogout={handleLogout}
        />
        <SearchForm onSearch={handleSearch} />
      </section>
      <Main
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        searchError={searchError}
      />
      <About />
      <Footer />
    </>
  )

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={homePage} />
        <Route
          path="/saved-news"
          element={
            <ProtectedRoute
              isLoggedIn={Boolean(currentUser)}
              isAuthChecking={isAuthChecking}
              onUnauthorized={handleSignInClick}
            >
              <SavedNews
                currentUser={currentUser}
                onSignInClick={handleSignInClick}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={handleCloseModal}
        onRegisterClick={handleRegisterClick}
        onLogin={handleLogin}
      />
      <RegisterModal
        isOpen={activeModal === 'register'}
        onClose={handleCloseModal}
        onLoginClick={handleSignInClick}
        onRegister={handleRegister}
      />
    </div>
  )
}

export default App
