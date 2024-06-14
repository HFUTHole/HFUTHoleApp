enum SchoolAreaEnum {
  xc = '宣城',
  txl = '屯溪路',
  fch = '翡翠湖',
}

declare interface IUsedGoodsDetailResponse {
  id: string
  createAt: string
  body: string
  views: number
  price: number
  area: SchoolAreaEnum
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
