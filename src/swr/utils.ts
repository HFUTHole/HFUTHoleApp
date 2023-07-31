import { InfiniteData } from 'react-query'

export const SWRKeys = {
  hole: {
    list: 'hole.list',
    post: 'hole.post',
    detail: 'hole.detail',
    comments: 'hole.comments',
    mutateCommentReply: 'hole.mutateCommentReply',
    getCommentReply: 'hole.getCommentReply',
  },
  notify: {
    base: 'notify.base',
    interaction: 'notify.interaction',
    system: 'notify.system',
  },
  user: {
    profile: 'user.profile',
    favoriteHoleList: 'user.favoriteHoleList',
    postedHoleList: 'user.postedHoleList',
    postedCommentList: 'user.postedCommentList',
  },
  space: {
    course: {
      all: 'space.course.all',
      classmate: 'space.course.classmate',
      failureRateQuery: 'space.course.failure-rate-query',
    },
    user: {
      info: 'space.user.info',
    },
    score: {
      all: 'space.score.all',
      single: 'space.score.single',
    },
  },
}

export const flatInfiniteQueryData = <T>(
  data: InfiniteData<any> | undefined
) => {
  const isListEmpty = data?.pages[0].items.length === 0

  return {
    isEmpty: isListEmpty,
    data: isListEmpty
      ? []
      : (data?.pages.map((page) => page.items).flat(1) as T[]),
  }
}
