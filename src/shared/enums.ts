export enum HoleListMode {
  latest = 'latest',
  hot = 'hot',
}

export enum HoleDetailCommentMode {
  all = 'all',
  author = 'author',
}

export enum HoleDetailCommentOrderMode {
  favorite = 'favorite',
  time = 'time',
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Banned = 'banned',
}

export enum ArticleCategoryEnum {
  hfutLife = '肥工日常',
  taoSecondHand = '淘二手',
  lostAndFound = '失物招领',
  study = '学习交流',
  cat = '肥工猫咖',
  love = '你的名字',
  ACG = 'ACG',
}

export enum NotifyEventType {
  comment = 'comment',
  reply = 'reply',
  like = 'like',
}
