export const MAIN_API_BASE_URL = (
  import.meta.env.VITE_MAIN_API_URL ||
  'https://api.news-explorer-mykeram.mooo.com'
).replace(/\/+$/, '')

export const JWT_STORAGE_KEY = 'jwt'
export const SESSION_ERROR_MESSAGE =
  'Unable to restore your session. Please try again when your connection is available.'
