declare interface IHoleReplyListResponse {
  items: IHoleReplyListItem[]
  meta: Meta
  comment: IHoleCommentListItem
}

declare interface IHoleReplyListItem {
  id: string
  createAt: string
  body: string
  favoriteCounts: number
  user: User
  comment: Comment
  isLiked: boolean
  replyUser: User
  imgs: string[]
  isNotification: boolean | null
}

interface User {
  id: number
  createAt: string
  username: string
  avatar: string
}

interface Comment {
  id: string
  createAt: string
  body: string
  favoriteCounts: number
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
