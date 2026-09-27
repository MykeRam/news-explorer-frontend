import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import About from '../About/About.jsx'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import LoginModal from '../LoginModal/LoginModal.jsx'
import Main from '../Main/Main.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.jsx'
import SavedNews from '../SavedNews/SavedNews.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx'
import { getNews } from '../../utils/newsApi.js'
import sitSpotImage from '../../images/article-sit-spot.jpg'
import natureImage from '../../images/article-nature.jpg'
import tetonImage from '../../images/article-teton.jpg'

const initialArticles = [
  {
    id: 1,
    image: sitSpotImage,
    imageAlt: 'A person sitting on a tree stump in a forest',
    date: 'November 4, 2020',
    title: "Everyone Needs a Special 'Sit Spot' in Nature",
    description:
      "Ever since I read Richard Louv's influential book, Last Child in the Woods, the idea of having a special sit spot has stuck with me.",
    source: 'Treehugger',
    url: 'https://www.treehugger.com/special-sit-spot-nature-5085811',
  },
  {
    id: 2,
    image: natureImage,
    imageAlt: 'A hiker resting in a green mountain landscape',
    date: 'February 19, 2019',
    title: 'Nature makes you better',
    description:
      'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
    source: 'National Geographic',
    url: 'https://www.nationalgeographic.com/travel/article/partner-content-nature-makes-you-better',
  },
  {
    id: 3,
    image: tetonImage,
    imageAlt: 'A moose standing among trees in a forest',
    date: 'October 21, 2020',
    title: 'Grand Teton Renews Historic Crest Trail',
    description:
      'The linking together of the Cascade and Death Canyon trails marked the first step toward a route through the most fascinating region of the park.',
    source: 'National Parks Traveler',
    url: 'https://www.nationalparkstraveler.org/2020/10/grand-teton-renews-historic-crest-trail',
  },
]

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
  const [isLoading] = useState(false)
  const [articles, setArticles] = useState(initialArticles)

  const handleSignInClick = () => setActiveModal('login')
  const handleRegisterClick = () => setActiveModal('register')
  const handleCloseModal = () => setActiveModal(null)
  const handleSearch = (query) =>
    getNews(query).then((data) => {
      setArticles(data.articles.map(formatArticle))
    })

  const homePage = (
    <>
      <section className="page__hero">
        <Header onSignInClick={handleSignInClick} />
        <SearchForm onSearch={handleSearch} />
      </section>
      <Main articles={articles} isLoading={isLoading} />
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
          element={<SavedNews onSignInClick={handleSignInClick} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={handleCloseModal}
        onRegisterClick={handleRegisterClick}
      />
      <RegisterModal
        isOpen={activeModal === 'register'}
        onClose={handleCloseModal}
        onLoginClick={handleSignInClick}
      />
    </div>
  )
}

export default App
