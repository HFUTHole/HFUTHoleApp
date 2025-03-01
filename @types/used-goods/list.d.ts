declare interface IUsedGoodsResponse {
  items: Item[]
  meta: Meta
}

interface Item {
  id: string
  createAt: string
  body: string
  price: number
  area: string
  collectorCounts: number
  status: number
  imgs: string[]
  creator: Creator
  collector: number
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
