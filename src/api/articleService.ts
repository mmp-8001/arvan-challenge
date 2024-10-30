import instance from '@/plugins/axios'

import type { ArticleInfo, PaginationMeta, UserInfo } from '@/types'

export const createArticle = (article: {
  title: string
  description: string
  body: string
  tags: string[]
}): Promise<{ user: UserInfo }> => {
  return instance.post('/articles', { article })
}

export const updateArticle = (
  slug: string,
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  },
): Promise<{ user: UserInfo }> => {
  return instance.put(`/articles/${slug}`, { article })
}

export const getArticle = (slug: string): Promise<{ article: ArticleInfo }> => {
  return instance.get(`/articles/${slug}`)
}

export const deleteArticle = (
  slug: string,
): Promise<{ article: ArticleInfo }> => {
  return instance.delete(`/articles/${slug}`)
}

export const getArticles = (pagination: {
  page: number
  perPage: number
}): Promise<{
  articles: ArticleInfo[]
  articlesCount: number
  meta: PaginationMeta
}> => {
  return instance.get('/articles', {
    data: { page: pagination.page, per_page: pagination.perPage },
    transformResponse: res => {
      const response = <
        { articles: ArticleInfo[]; articlesCount: number; meta: PaginationMeta }
      >JSON.parse(res)
      // Calculate the starting and ending indices for slicing
      const start = (pagination.page - 1) * pagination.perPage
      const end = start + pagination.perPage

      // Slice the articles array based on the current page and perPage count
      response.articles = response.articles.slice(start, end)

      const totalPages = Math.ceil(response.articlesCount / pagination.perPage)
      const hasNextPage = pagination.page < totalPages
      const hasPrevPage = pagination.page > 1

      response['meta'] = {
        total: totalPages,
        next: hasNextPage,
        prev: hasPrevPage,
        current: pagination.page,
      }

      return response
    },
  })
}
