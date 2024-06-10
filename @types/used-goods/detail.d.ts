declare interface IUsedGoodsDetailResponse {
  id: string
  createAt: string
  body: string
  viewsCount: number
  price: number
  area: string
  collectorCounts: number
  commentsCount: number
  status: number
  imgs: string[]
  creator: Creator
  category: Category
  isCollected: number
}

interface Creator {
  id: number
  createAt: string
  username: string
  role: string
  avatar: string
}

interface Category {
  id: string
  createAt: string
  name: string
}
