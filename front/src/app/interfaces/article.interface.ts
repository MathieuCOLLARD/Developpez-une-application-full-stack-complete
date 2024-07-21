import { Comment } from './comment.interface'

export interface RootArticle {
    articles: Article[]
  }
  
  export interface Article {
    id?: number
    title: string
    author?: string
    content: string
    comments?: Comment[]
    createdAt?: string
    topicTitle: number
  }
  