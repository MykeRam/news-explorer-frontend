import { MAIN_API_BASE_URL } from './config.js'

export class ApiError extends Error {
  constructor(message, status, data, retryAfter) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
    this.retryAfter = retryAfter
  }
}

const getErrorMessage = (data, status) => {
  const validationMessages = Object.values(data?.validation || {})
    .map((segment) => segment.message)
    .filter(Boolean)

  return (
    validationMessages.join('; ') ||
    data?.message ||
    `Request failed with status ${status}`
  )
}

export class MainApi {
  constructor({ baseUrl = MAIN_API_BASE_URL, fetchImpl = (...args) => globalThis.fetch(...args) } = {}) {
    this.baseUrl = baseUrl.replace(/\/+$/, '')
    this.fetch = fetchImpl
  }

  request(path, { method = 'GET', token, body } = {}) {
    const headers = {}
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    if (token) headers.Authorization = `Bearer ${token}`

    return this.fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }).then(async (response) => {
      const text = await response.text()
      let data = null
      try {
        data = text ? JSON.parse(text) : null
      } catch {
        if (response.ok) {
          throw new ApiError('The server returned an invalid response.', response.status)
        }
      }

      if (!response.ok) {
        throw new ApiError(
          getErrorMessage(data, response.status),
          response.status,
          data,
          response.headers.get('Retry-After'),
        )
      }

      return data
    })
  }

  registerUser({ email, password, name }) {
    return this.request('/signup', { method: 'POST', body: { email, password, name } })
  }

  loginUser({ email, password }) {
    return this.request('/signin', { method: 'POST', body: { email, password } })
  }

  checkToken(token) {
    return this.request('/users/me', { token })
  }

  getSavedArticles(token) {
    return this.request('/articles', { token })
  }

  saveArticle(token, { keyword, title, text, date, source, link, image }) {
    return this.request('/articles', {
      method: 'POST',
      token,
      body: { keyword, title, text, date, source, link, image },
    })
  }

  deleteArticle(token, articleId) {
    return this.request(`/articles/${encodeURIComponent(articleId)}`, {
      method: 'DELETE',
      token,
    })
  }
}

export default new MainApi()
