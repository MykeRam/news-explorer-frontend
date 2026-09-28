const PROFILE_STORAGE_KEY = 'news-explorer-profile'
const SAVED_ARTICLES_STORAGE_KEY = 'news-explorer-saved-articles'
const STUB_TOKEN = 'news-explorer-stage-1-token'

const respond = (callback) =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        resolve(callback())
      } catch (error) {
        reject(error)
      }
    }, 250)
  })

const readStorage = (key, fallback) => {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const requireFields = (fields) => {
  const hasEmptyField = Object.values(fields).some(
    (value) => typeof value !== 'string' || !value.trim(),
  )

  if (hasEmptyField) {
    throw new Error('All fields are required.')
  }
}

const authorize = (token) => {
  if (token !== STUB_TOKEN) {
    throw new Error('Authorization required.')
  }
}

const getDefaultName = (email) => {
  const emailName = email.split('@')[0]
  return emailName.charAt(0).toUpperCase() + emailName.slice(1)
}

const createId = () =>
  globalThis.crypto?.randomUUID?.() ||
  `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const registerUser = ({ email, password, name }) =>
  respond(() => {
    requireFields({ email, password, name })

    const user = { email: email.trim(), name: name.trim() }
    writeStorage(PROFILE_STORAGE_KEY, user)

    return user
  })

export const loginUser = ({ email, password }) =>
  respond(() => {
    requireFields({ email, password })

    const storedUser = readStorage(PROFILE_STORAGE_KEY, null)
    const user =
      storedUser?.email === email.trim()
        ? storedUser
        : { email: email.trim(), name: getDefaultName(email.trim()) }

    writeStorage(PROFILE_STORAGE_KEY, user)

    return { token: STUB_TOKEN, user }
  })

export const checkToken = (token) =>
  respond(() => {
    authorize(token)

    const user = readStorage(PROFILE_STORAGE_KEY, null)

    if (!user) {
      throw new Error('User not found.')
    }

    return user
  })

export const getSavedArticles = (token) =>
  respond(() => {
    authorize(token)
    return readStorage(SAVED_ARTICLES_STORAGE_KEY, [])
  })

export const saveArticle = (token, article, keyword) =>
  respond(() => {
    authorize(token)

    const savedArticles = readStorage(SAVED_ARTICLES_STORAGE_KEY, [])
    const savedArticle = {
      ...article,
      _id: createId(),
      keyword,
    }

    writeStorage(SAVED_ARTICLES_STORAGE_KEY, [savedArticle, ...savedArticles])
    return savedArticle
  })

export const deleteArticle = (token, articleId) =>
  respond(() => {
    authorize(token)

    const savedArticles = readStorage(SAVED_ARTICLES_STORAGE_KEY, [])
    const articleToDelete = savedArticles.find(
      (article) => article._id === articleId,
    )

    if (!articleToDelete) {
      throw new Error('Saved article not found.')
    }

    writeStorage(
      SAVED_ARTICLES_STORAGE_KEY,
      savedArticles.filter((article) => article._id !== articleId),
    )

    return articleToDelete
  })
