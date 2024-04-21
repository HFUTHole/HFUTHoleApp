declare interface INotifySystemListResponse {
  items: Item[]
  meta: Meta
}

declare interface INotifySystemListItem {
  id: string
  createAt: string
  title: string
  body: string
  isRead: boolean
  post: Hole
  comment: any
  reply: any
}

interface Hole {
  id: number
  createAt: string
  body: string
  imgs: any[]
  bilibili: string
  favoriteCounts: number
  tags: any[]
  vote: any
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
