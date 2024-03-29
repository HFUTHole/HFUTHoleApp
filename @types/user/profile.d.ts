enum Role {
  User = 'user',
  Admin = 'admin',
  Banned = 'banned',
}

declare interface IUserProfile {
  id: number
  createAt: string
  username: string
  avatar: string
  role: Role
  level: {
    id: string
    level: number
    experience: number
    nextLevelRequiredExperience: number
  }
}
