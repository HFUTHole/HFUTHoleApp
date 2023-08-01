export interface HoleReplyListRouteParams {
  commentId: string
  replyId?: string
  holeId?: number

  /**
   * 标明是否是从Message组件点过来的以此来判定是否渲染CommentMaskModal组件
   */
  isMessageFrom?: boolean
}
