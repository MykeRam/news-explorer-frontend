import mainApi from './MainApi.js'

// Share an in-flight load across StrictMode's setup/cleanup cycle.
// Completed sessions are never cached: every refresh verifies the token again.
const pendingSessions = new Map()

export const loadSession = (token) => {
  if (!pendingSessions.has(token)) {
    const request = mainApi.checkToken(token)
      .then((user) => mainApi.getSavedArticles(token)
        .then((articles) => ({ user, articles })))
      .finally(() => pendingSessions.delete(token))
    pendingSessions.set(token, request)
  }
  return pendingSessions.get(token)
}
