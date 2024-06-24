declare interface IUsedGoodsUserGoodsListResponse {
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
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
