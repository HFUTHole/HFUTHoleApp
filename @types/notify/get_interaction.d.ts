enum NotifyEventType {
  comment = 'comment',
  reply = 'reply',
  like = 'like',
}

declare interface INotifyInteractionListResponse {
  items: Item[]
  meta: Meta
}

enum InteractionNotifyTargetType {
  comment = 'comment',
  reply = ' reply',
  post = 'post',
  usedGoods = 'usedGoods',
}

declare interface INotifyInteractionListItem {
  id: string
  createAt: string
  isRead: boolean
  type: NotifyEventType
  body: string
  creator: IUser
  post?: Hole
  comment?: IHoleCommentListItem
  reply?: IHoleReplyListItem
  target?: InteractionNotifyTargetType
  usedGoods?: {
    id: string
    createAt: string
    body: string
    views: number
    price: number
    area: string
    collectorCounts: number
    status: number
    imgs: string[]
  }
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
