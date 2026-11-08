import { FALLBACK_ARTICLE_IMAGE_URL } from './config.js'

const httpUrl = (value) => {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}

export const formatArticleDate = (value) => {
  const parts = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value.split('-').map(Number) : null
  const date = parts ? new Date(parts[0], parts[1] - 1, parts[2]) : new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export const formatSearchArticles = (articles, keyword, fallbackImage) => {
  const links = new Set()
  return articles.flatMap((article, index) => {
    const url = httpUrl(article.url)
    if (url && links.has(url)) return []
    if (url) links.add(url)
    const imageUrl = httpUrl(article.urlToImage) || FALLBACK_ARTICLE_IMAGE_URL
    return [{
      id: url || `${article.title}-${article.publishedAt}-${index}`,
      url,
      keyword: keyword.trim(),
      image: httpUrl(article.urlToImage) || fallbackImage,
      imageUrl,
      imageAlt: '',
      publishedAt: article.publishedAt,
      date: formatArticleDate(article.publishedAt),
      title: article.title?.trim() || 'Untitled article',
      description: article.description?.trim() || '',
      source: article.source?.name?.trim() || 'Unknown source',
    }]
  })
}

export const formatSavedArticle = (article) => ({
  ...article,
  id: article._id,
  url: article.link,
  description: article.text,
  imageAlt: '',
  date: formatArticleDate(article.date),
})

export const createArticlePayload = (article) => {
  const link = httpUrl(article.url)
  if (!link) throw new Error('This article has no valid link and cannot be saved.')
  return {
    keyword: article.keyword,
    title: article.title,
    text: article.description || article.title,
    date: article.publishedAt || article.date,
    source: article.source,
    link,
    image: httpUrl(article.imageUrl || article.image) || FALLBACK_ARTICLE_IMAGE_URL,
  }
}

export const getArticleErrorMessage = (error) => {
  if (error.status === 429) {
    const retry = Number(error.retryAfter)
    return retry > 0
      ? `Too many requests. Please try again in ${retry} seconds.`
      : 'Too many requests. Please try again later.'
  }
  if (error instanceof TypeError) return 'Unable to update saved articles. Check your connection and try again.'
  return error.message || 'Unable to update saved articles. Please try again.'
}
