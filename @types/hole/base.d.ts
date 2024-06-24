declare interface IHole {
  id: number
  createAt: string
  updateAt: string
  bilibili: string | null
  title: string
  body: string
  imgs: string[]
  favoriteCounts: number
  user: User
  vote: Vote
  tags: Tag[]
  voteTotalCount: number
  isLiked: boolean
  comments: Comment[]
  commentCounts: number
  category: {
    id: number
    category: string
    subcategory: string
  }
  classification: {
    name: string
    description: string
  } | null
  subClassification: {
    name: string
    description: string
  } | null
}

interface Comment {
  id: string
  createAt: string
  body: string
  favoriteCount: number

  user: User
}

interface User {
  id: number
  createAt: string
  username: string
  avatar: string
}
