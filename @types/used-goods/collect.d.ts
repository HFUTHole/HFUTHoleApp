declare interface IUsedGoodsCollectedListResponse {
  items: Item[]
  meta: Meta
}

interface Item {
  id: string
  createAt: string
  body: string
  views: number
  price: number
  area: string
  collectorCounts: number
  status: number
  imgs: string[]
  creator: Creator
}

interface Creator {
  id: number
  createAt: string
  username: string
  role: string
  avatar: string
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
