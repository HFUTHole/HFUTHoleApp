declare interface IUserCommentListResponse {
  items: Item[]
  meta: Meta
}

declare interface IUserCommentListItem {
  id: string
  createAt: string
  body: string
  favoriteCounts: number
  imgs: any[]
  user: User
  hole: Hole | null
  comment: null
  reply: null
}

interface User {
  username: string
  avatar: string
}

interface Hole {
  id: number
  imgs: any[]
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
