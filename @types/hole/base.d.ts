declare interface IHole {
  id: number
  createAt: string
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
  expressEmojis: ExpressEmoji[]
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

interface ExpressEmoji {
  id: string
  emoji: string
  users: Omit<User, 'createAt'>[]
}
