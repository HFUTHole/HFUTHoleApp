import React from 'react'
import {
  AnimatedLikeButton,
  AnimatedLikeButtonDataType,
} from '@/components/animation/LikeButton'
import { useMutation } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { DeleteLikeHoleRequest, PostLikeHoleRequest } from '@/request/apis/hole'

export const HoleLikeButton: React.FC<{
  data: AnimatedLikeButtonDataType & { id: number }
  size?: number
}> = (props) => {
  const { data, size } = props
  const mutation = useMutation({
    mutationKey: [SWRKeys.hole.like],
    mutationFn: (isLiked: boolean) => {
      return isLiked
        ? DeleteLikeHoleRequest({
            id: data.id,
          })
        : PostLikeHoleRequest({
            id: data.id,
          })
    },
  })

  return <AnimatedLikeButton data={data} mutation={mutation} size={size} />
}
