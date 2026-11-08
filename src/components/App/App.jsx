import { useCallback, useEffect, useRef, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import './App.css'
import About from '../About/About.jsx'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import LoginModal from '../LoginModal/LoginModal.jsx'
import Main from '../Main/Main.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.jsx'
import RegistrationSuccessModal from '../RegistrationSuccessModal/RegistrationSuccessModal.jsx'
import SavedNews from '../SavedNews/SavedNews.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx'
import { getNews } from '../../utils/newsApi.js'
import mainApi from '../../utils/MainApi.js'
import { loadSession } from '../../utils/session.js'
import { JWT_STORAGE_KEY, SESSION_ERROR_MESSAGE } from '../../utils/config.js'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import { formatSearchArticles, formatSavedArticle, createArticlePayload, getArticleErrorMessage } from '../../utils/articles.js'
import sitSpotImage from '../../images/article-sit-spot.jpg'

const SEARCH_ERROR_MESSAGE =
  'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'

function App() {
  const history = useHistory()
  const sessionGeneration = useRef(0)
  const loginAttempt = useRef(null)
  const pendingArticleRequests = useRef(new Map())
  const searchGeneration = useRef(0)
  const [sessionAttempt, setSessionAttempt] = useState(0)
  const [sessionError, setSessionError] = useState('')
  const [articleError, setArticleError] = useState('')
  const [activeModal, setActiveModal] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [articles, setArticles] = useState([])
  const [savedArticles, setSavedArticles] = useState([])
  const [pendingArticleUrls, setPendingArticleUrls] = useState([])

  useEffect(() => {
    const generation = ++sessionGeneration.current
    const token = localStorage.getItem(JWT_STORAGE_KEY)
    const isCurrent = () => generation === sessionGeneration.current &&
      localStorage.getItem(JWT_STORAGE_KEY) === token

    setCurrentUser(null)
    setSavedArticles([])
    setPendingArticleUrls([])
    pendingArticleRequests.current.clear()
    setArticleError('')
    setSessionError('')
    setIsAuthChecking(Boolean(token))

    if (token) {
      loadSession(token)
        .then(({ user, articles: storedArticles }) => {
          if (!isCurrent()) return
          setCurrentUser(user)
          setActiveModal(null)
          setSavedArticles(storedArticles.map(formatSavedArticle))
        })
        .catch((error) => {
          if (!isCurrent()) return
          if (error.status === 401) {
            localStorage.removeItem(JWT_STORAGE_KEY)
          } else {
            setSessionError(error.status === 429 ? error.message : SESSION_ERROR_MESSAGE)
          }
        })
        .finally(() => {
          if (generation === sessionGeneration.current) setIsAuthChecking(false)
        })
    }

    const handleStorage = (event) => {
      if (event.storageArea === localStorage &&
          (event.key === JWT_STORAGE_KEY || event.key === null)) {
        // Invalidate old responses immediately, before React runs the next effect.
        sessionGeneration.current += 1
        loginAttempt.current = null
        setCurrentUser(null)
        setSavedArticles([])
        setPendingArticleUrls([])
        pendingArticleRequests.current.clear()
        setIsAuthChecking(Boolean(localStorage.getItem(JWT_STORAGE_KEY)))
        setSessionAttempt((attempt) => attempt + 1)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      sessionGeneration.current += 1
    }
  }, [sessionAttempt])

  const handleSignInClick = useCallback(() => setActiveModal('login'), [])
  const handleRegisterClick = () => {
    handleCloseModal()
    setActiveModal('register')
  }
  const handleRegistrationSuccess = () => setActiveModal('registration-success')
  const handleCloseModal = () => {
    if (loginAttempt.current !== null) {
      sessionGeneration.current += 1
      loginAttempt.current = null
      setIsAuthChecking(false)
    }
    setActiveModal(null)
  }
  const handleLogin = (credentials) => {
    const generation = ++sessionGeneration.current
    loginAttempt.current = generation
    localStorage.removeItem(JWT_STORAGE_KEY)
    setCurrentUser(null)
    setSavedArticles([])
    setPendingArticleUrls([])
    pendingArticleRequests.current.clear()
    setSessionError('')
    setArticleError('')
    setIsAuthChecking(true)

    return mainApi.loginUser(credentials)
      .then(({ token }) => {
        if (generation !== sessionGeneration.current) throw new DOMException('Sign in canceled', 'AbortError')
        return loadSession(token).then((session) => ({ ...session, token }))
      })
      .then(({ token, user, articles: storedArticles }) => {
        if (generation !== sessionGeneration.current) return
        localStorage.setItem(JWT_STORAGE_KEY, token)
        setCurrentUser(user)
        setSavedArticles(storedArticles.map(formatSavedArticle))
        loginAttempt.current = null
        handleCloseModal()
      })
      .finally(() => {
        if (generation === sessionGeneration.current) {
          loginAttempt.current = null
          setIsAuthChecking(false)
        }
      })
  }
  const handleRegister = (userData) => mainApi.registerUser(userData)
  const handleLogout = () => {
    sessionGeneration.current += 1
    localStorage.removeItem(JWT_STORAGE_KEY)
    setCurrentUser(null)
    setSavedArticles([])
    setPendingArticleUrls([])
    pendingArticleRequests.current.clear()
    setSessionError('')
    setArticleError('')
    setIsAuthChecking(false)
    handleCloseModal()
    history.replace('/')
  }
  const handleSearch = (query) => {
    const generation = ++searchGeneration.current
    setArticleError('')
    setHasSearched(true)
    setIsLoading(true)
    setSearchError('')
    setArticles([])

    return getNews(query)
      .then((data) => {
        if (generation === searchGeneration.current) {
          setArticles(formatSearchArticles(data.articles, query, sitSpotImage))
        }
      })
      .catch(() => {
        if (generation === searchGeneration.current) setSearchError(SEARCH_ERROR_MESSAGE)
      })
      .finally(() => {
        if (generation === searchGeneration.current) setIsLoading(false)
      })
  }

  const handleToggleArticleSave = (article) => {
    const token = localStorage.getItem(JWT_STORAGE_KEY)
    if (!token || !currentUser) {
      handleRegisterClick()
      return Promise.resolve()
    }
    if (pendingArticleRequests.current.has(article.url)) return Promise.resolve()
    const savedArticle = savedArticles.find((stored) => stored.url === article.url)
    const generation = sessionGeneration.current
    const operation = {}
    const isCurrent = () => generation === sessionGeneration.current &&
      localStorage.getItem(JWT_STORAGE_KEY) === token
    pendingArticleRequests.current.set(article.url, operation)
    setArticleError('')
    setPendingArticleUrls((urls) => [...urls, article.url])

    return Promise.resolve()
      .then(() => savedArticle
        ? mainApi.deleteArticle(token, savedArticle._id)
        : mainApi.saveArticle(token, createArticlePayload(article)))
      .then((storedArticle) => {
        if (!isCurrent()) return
        setSavedArticles((current) => {
          if (!isCurrent()) return current
          if (savedArticle) return current.filter((stored) => stored._id !== savedArticle._id)
          return [formatSavedArticle(storedArticle), ...current.filter((stored) => stored.url !== article.url)]
        })
      })
      .catch((error) => {
        if (!isCurrent()) return
        if (error.status === 401) {
          handleLogout()
          handleSignInClick()
        } else {
          setArticleError(getArticleErrorMessage(error))
        }
      })
      .finally(() => {
        if (pendingArticleRequests.current.get(article.url) === operation) {
          pendingArticleRequests.current.delete(article.url)
          if (isCurrent()) setPendingArticleUrls((urls) => urls.filter((url) => url !== article.url))
        }
      })
  }

  const homePage = (
    <>
      <section className="page__hero">
        <Header
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
        isLoggedIn={Boolean(currentUser)}
        savedArticles={savedArticles}
        pendingArticleUrls={pendingArticleUrls}
        onToggleSave={handleToggleArticleSave}
      />
      <About />
      <Footer />
    </>
  )

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {sessionError && (
          <div className="page__notice" role="alert">
            <p>{sessionError}</p>
            <button type="button" onClick={() => setSessionAttempt((attempt) => attempt + 1)}>
              Retry session
            </button>
            <button type="button" onClick={handleLogout}>Sign out</button>
          </div>
        )}
        {articleError && <p className="page__notice" role="alert">{articleError}</p>}
        <Switch>
          <Route exact path="/">
            {homePage}
          </Route>
          <Route path="/saved-news">
            <ProtectedRoute
              isAuthChecking={isAuthChecking}
              sessionError={sessionError}
              onUnauthorized={handleSignInClick}
            >
              <SavedNews
                onSignInClick={handleSignInClick}
                onLogout={handleLogout}
                savedArticles={savedArticles}
                pendingArticleUrls={pendingArticleUrls}
                onToggleSave={handleToggleArticleSave}
              />
            </ProtectedRoute>
          </Route>
          <Redirect to="/" />
        </Switch>
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
          onSuccess={handleRegistrationSuccess}
        />
        <RegistrationSuccessModal
          isOpen={activeModal === 'registration-success'}
          onClose={handleCloseModal}
          onSignInClick={handleSignInClick}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
