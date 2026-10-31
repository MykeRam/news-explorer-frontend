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
import sitSpotImage from '../../images/article-sit-spot.jpg'

const SEARCH_ERROR_MESSAGE =
  'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'

const formatArticleDate = (publishedAt) => {
  const dateOnly = typeof publishedAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(publishedAt)
  const date = dateOnly
    ? new Date(...publishedAt.split('-').map((part, index) => Number(part) - (index === 1 ? 1 : 0)))
    : new Date(publishedAt)

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
  // Article thumbnails are supplementary; the card already exposes the
  // headline, summary, and an explicitly labeled article link to assistive tech.
  imageAlt: '',
  date: formatArticleDate(article.publishedAt),
  title: article.title || 'Untitled article',
  description: article.description || '',
  source: article.source?.name || 'Unknown source',
  url: article.url || '',
})

const formatSavedArticle = (article) => ({
  ...article,
  id: article._id,
  url: article.link,
  description: article.text,
  imageAlt: '',
  date: formatArticleDate(article.date),
})

function App() {
  const history = useHistory()
  const sessionGeneration = useRef(0)
  const loginAttempt = useRef(null)
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
  const [currentKeyword, setCurrentKeyword] = useState('')
  const [pendingArticleUrls, setPendingArticleUrls] = useState([])

  useEffect(() => {
    const generation = ++sessionGeneration.current
    const token = localStorage.getItem(JWT_STORAGE_KEY)
    const isCurrent = () => generation === sessionGeneration.current &&
      localStorage.getItem(JWT_STORAGE_KEY) === token

    setCurrentUser(null)
    setSavedArticles([])
    setPendingArticleUrls([])
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
    setSessionError('')
    setArticleError('')
    setIsAuthChecking(false)
    handleCloseModal()
    history.replace('/')
  }
  const handleSearch = (query) => {
    setCurrentKeyword(query)
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

  const handleToggleArticleSave = (article) => {
    const token = localStorage.getItem(JWT_STORAGE_KEY)

    if (!token || !currentUser) {
      handleSignInClick()
      return Promise.resolve()
    }

    const savedArticle = savedArticles.find(
      (storedArticle) => storedArticle.url === article.url,
    )

    const generation = sessionGeneration.current
    const isCurrent = () => generation === sessionGeneration.current &&
      localStorage.getItem(JWT_STORAGE_KEY) === token
    setArticleError('')
    setPendingArticleUrls((currentUrls) => [...currentUrls, article.url])

    const request = savedArticle
      ? mainApi.deleteArticle(token, savedArticle._id).then(() => {
          if (!isCurrent()) return
          setSavedArticles((currentArticles) =>
            currentArticles.filter(
              (storedArticle) => storedArticle._id !== savedArticle._id,
            ),
          )
        })
      : mainApi.saveArticle(token, {
          keyword: currentKeyword,
          title: article.title,
          text: article.description || article.title,
          date: article.date,
          source: article.source,
          link: article.url,
          image: new URL(article.image, window.location.origin).href,
        }).then((storedArticle) => {
          if (!isCurrent()) return
          setSavedArticles((currentArticles) => [
            formatSavedArticle(storedArticle),
            ...currentArticles,
          ])
        })

    return request
      .catch((error) => {
        if (!isCurrent()) return
        if (error.status === 401) {
          handleLogout()
          handleSignInClick()
        } else {
          setArticleError(error.message || 'Unable to update saved articles. Please try again.')
        }
      })
      .finally(() => {
        if (!isCurrent()) return
        setPendingArticleUrls((currentUrls) =>
          currentUrls.filter((url) => url !== article.url),
        )
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
              isLoggedIn={Boolean(currentUser)}
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
