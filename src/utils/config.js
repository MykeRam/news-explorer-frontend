export const MAIN_API_BASE_URL = (
  import.meta.env.VITE_MAIN_API_URL ||
  'https://api.news-explorer-mykeram.mooo.com'
).replace(/\/+$/, '')
