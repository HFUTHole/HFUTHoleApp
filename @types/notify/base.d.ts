declare interface IGetBaseNotificationsResponse {
  interaction: Interaction
  system: System
}

interface Interaction {
  data?: Data
  totalCount: number
}

interface Data {
  id: string
  createAt: string
  isRead: boolean
  type: string
  body: string
}

interface System {
  data?: Data
  totalCount: number
}
