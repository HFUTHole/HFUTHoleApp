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
  hfutLife = '日常',
  littleCreature = '小动物',
  loveStory = '情感分享',
  hobby = '兴趣娱乐',
  study = '学在工大',
  lostAndFound = '失物招领',
  taoSecondHand = '淘二手',
}

export enum NotifyEventType {
  comment = 'comment',
  reply = 'reply',
  like = 'like',
}
