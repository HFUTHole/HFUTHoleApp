import { View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import {
  DeleteCommentLikeRequest,
  LikeCommentRequest,
} from '@/request/apis/hole'
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { ReplyList } from '@/pages/hole/detail/components/ReplyList'

export const HoleDetailCommentItem: React.FC<{
  data: IHoleCommentListItem
  page: number
}> = ({ data, page }) => {
  const { openInput } = useBottomCommentContext()

  const handleReply = (data: IHoleCommentListItem) => {
    openInput({
      commentId: data.id,
      ...(data as any),
    })
  }

  return (
    <View
      className={`grid space-y-2 ${data.isNotification && 'bg-surface/10'}`}
    >
      <CommentItem
        data={data}
        onBodyPress={handleReply as any}
        bottom={data.replies?.length > 0 && <ReplyList data={data} />}
        deleteLikeRequest={DeleteCommentLikeRequest}
        onLikeRequest={LikeCommentRequest}
      />
    </View>
  )
}
