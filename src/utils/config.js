export const MAIN_API_BASE_URL = (
  import.meta.env.VITE_MAIN_API_URL ||
  'https://api.news-explorer-mykeram.mooo.com'
).replace(/\/+$/, '')

export const JWT_STORAGE_KEY = 'jwt'
export const SESSION_ERROR_MESSAGE =
  'Unable to restore your session. Please try again when your connection is available.'

export const FALLBACK_ARTICLE_IMAGE_URL =
  'https://raw.githubusercontent.com/MykeRam/news-explorer-frontend/main/src/images/article-sit-spot.jpg'
