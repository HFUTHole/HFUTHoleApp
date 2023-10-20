export const Config = {
  request: {
    // baseURL: 'http://129.211.26.121:8080/',
    baseURL: 'http://192.168.142.194:8000/',
    imgBaseURL: 'http://192.168.142.194:8000/',
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
    titleMaxLength: 15,
  },
  user: {
    minUsernameLength: 1,
    maxUsernameLength: 10,
  },
}

// export function setupGlobalConfig() {}
