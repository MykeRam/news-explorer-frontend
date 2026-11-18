export const MAIN_API_BASE_URL = (
  import.meta.env.VITE_MAIN_API_URL ||
  'https://api.news-explorer-mykeram.mooo.com'
).replace(/\/+$/, '')

export const JWT_STORAGE_KEY = 'jwt'
export const SESSION_ERROR_MESSAGE =
  'Unable to restore your session. Please try again when your connection is available.'

export const FALLBACK_ARTICLE_IMAGE_URL =
  'https://raw.githubusercontent.com/MykeRam/news-explorer-frontend/main/src/images/article-sit-spot.jpg'

export const ARTICLES_PER_PAGE = 3
export const SEARCH_ERROR_MESSAGE =
  'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'

export const NEWS_API_URL = 'https://newsapi.org/v2/everything'
export const NEWS_API_PROXY_URL = 'https://news-api-proxy.up.railway.app/news/v2/everything'
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
export const NEWS_SEARCH_DAYS = 7
export const NEWS_PAGE_SIZE = 100
export const NEWS_LANGUAGE = 'en'
export const NEWS_SORT_ORDER = 'publishedAt'

export const PASSWORD_MIN_LENGTH = 8
export const USERNAME_MIN_LENGTH = 2
export const USERNAME_MAX_LENGTH = 30
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const INVALID_EMAIL_MESSAGE = 'Please enter a valid email address.'
export const INVALID_RESPONSE_MESSAGE = 'The server returned an invalid response.'

export const HTTP_STATUS = {
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  TOO_MANY_REQUESTS: 429,
}

export const EXTERNAL_LINKS = {
  TRIPLETEN: 'https://tripleten.com/',
  GITHUB: 'https://github.com/MykeRam',
  LINKEDIN: 'https://www.linkedin.com/in/michaelramirezz/',
}
