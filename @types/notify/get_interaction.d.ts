enum NotifyEventType {
  comment = 'comment',
  reply = 'reply',
  like = 'like',
}

declare interface INotifyInteractionListResponse {
  items: Item[]
  meta: Meta
}

declare interface INotifyInteractionListItem {
  id: string
  createAt: string
  isRead: boolean
  type: NotifyEventType
  body: string
  creator: IUser
  hole?: Hole
  comment?: IHoleCommentListItem
  reply?: IHoleReplyListItem
}

interface Hole {
  id: number
  createAt: string
  imgs: string[]
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
