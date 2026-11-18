import {
  NEWS_API_URL, NEWS_API_PROXY_URL, NEWS_API_KEY, NEWS_SEARCH_DAYS,
  NEWS_PAGE_SIZE, NEWS_LANGUAGE, NEWS_SORT_ORDER,
} from './config.js'

const getDateString = (date) => date.toISOString().split('T')[0]

const getSearchDates = () => {
  const to = new Date()
  const from = new Date(to)

  from.setDate(from.getDate() - NEWS_SEARCH_DAYS)

  return {
    from: getDateString(from),
    to: getDateString(to),
  }
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  }

  return response
    .json()
    .catch(() => ({}))
    .then((data) => {
      throw new Error(
        data.message || `News request failed with status ${response.status}`,
      )
    })
}

export const getNews = (query) => {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return Promise.reject(new Error('Enter a topic to search for news.'))
  }

  if (!NEWS_API_KEY) {
    return Promise.reject(
      new Error('Add VITE_NEWS_API_KEY to your .env.local file.'),
    )
  }

  const { from, to } = getSearchDates()
  const params = new URLSearchParams({
    q: trimmedQuery,
    from,
    to,
    language: NEWS_LANGUAGE,
    sortBy: NEWS_SORT_ORDER,
    pageSize: String(NEWS_PAGE_SIZE),
    apiKey: NEWS_API_KEY,
  })
  const baseUrl = import.meta.env.PROD ? NEWS_API_PROXY_URL : NEWS_API_URL

  return fetch(`${baseUrl}?${params.toString()}`).then(checkResponse)
}
