export const Config = {
  request: {
    baseURL: 'http://172.19.74.76:8000',
    imgBaseURL: 'https://static.xiaofeishu.lnyynet.com',
    spaceBaseURL: 'https://hfut-space.top/',
    timeout: 5000,
  },
}

export const Limit = {
  holeBodyMaxLength: 4096,
  holeVoteMaxLength: 5,
  holeVoteOptionLength: 10,
  holeTagsMaxLength: 5,
  holeCommentBodyMaxLength: 1000,
  holeCommentBodyMinLength: 1,
  commentMaxImgLength: 2,
  reportReasonMaxLength: 500,
  reportReasonMinLength: 10,
  hole: {
    maxInfoCommentBodyLength: 30,
    titleMaxLength: 20,
  },
  img: {
    imgMaxSize: 4, // MB
  },
  user: {
    minUsernameLength: 1,
    maxUsernameLength: 10,
  },
}

// export function setupGlobalConfig() {}
