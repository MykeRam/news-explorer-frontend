export const rankKeywords = (articles) => {
  const counts = new Map()
  articles.forEach(({ keyword }) => {
    const value = keyword?.trim()
    if (value) counts.set(value, (counts.get(value) || 0) + 1)
  })
  return [...counts.entries()]
    .sort(([left, leftCount], [right, rightCount]) => rightCount - leftCount ||
      left.localeCompare(right, 'en', { sensitivity: 'base' }) || left.localeCompare(right, 'en'))
    .map(([keyword]) => keyword)
}

export const getKeywordSummary = (articles) => {
  const keywords = rankKeywords(articles)
  if (keywords.length <= 3) return keywords.join(', ')
  return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} more`
}
