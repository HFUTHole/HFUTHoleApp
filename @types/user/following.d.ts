declare interface IUserFollowingResponse {
  id: number
  createAt: string
  username: string
  role: string
  avatar: string
  following?: Following[]
  followers?: Followers[]
}

interface Following {
  id: number
  createAt: string
  username: string
  role: string
  avatar: string
  desc?: string
}

interface Followers {
  id: number
  createAt: string
  username: string
  role: string
  avatar: string
  desc?: string
}
