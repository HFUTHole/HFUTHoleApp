import { createStore } from 'hox'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CommentReplyValidator } from '@/shared/validators/hole/reply'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { isNullOrUndefined } from '@/shared/utils/utils'
import {
  PostHoleCommentReplyRequest,
  PostHoleDetailCommentRequest,
} from '@/request/apis/hole'
import { Apis } from '@/request/apis'

export type IBottomCommentData = {
  id?: number
  commentId?: string
  replyId?: string
  imgs?: string[]
  type?: 'post' | 'goods'
  goodsId?: string
} & Omit<Partial<IHoleCommentListItem>, 'id'>

export const [useBottomCommentContext, BottomCommentContext] = createStore(
  (props: { isGoods?: boolean; goodsId?: string }) => {
    const { isGoods = false } = props

    const [showInput, setShowInput] = useState(false)
    const [data, setData] = useState<IBottomCommentData | null>(null)

    const isReply = !isNullOrUndefined(data)

    const form = useForm<CommentReplyValidator>({
      resolver: classValidatorResolver(CommentReplyValidator),
    })

    const { getValues, resetField } = form

    const openInput = (data: IBottomCommentData | null = null) => {
      setData(data)
      setShowInput(true)
    }

    const closeInput = (isResetFields = false) => {
      const isInputEmpty = !getValues('body')?.length

      if (isInputEmpty) {
        setData(null)
      }

      if (isResetFields) {
        resetField('body')
      }

      setShowInput(false)
    }

    const reqFunc = (param: IBottomCommentData) => {
      const params = {
        imgs: param.imgs,
        body: param.body,
      } as IBottomCommentData

      if (isReply) {
        params.commentId = data.commentId
        if (data.replyId) {
          params.replyId = data.replyId
        }
      } else {
        params.id = param.id
      }

      if (isGoods && isReply) {
        params.type = 'goods'
        params.goodsId = props.goodsId
      }

      const func = isReply
        ? PostHoleCommentReplyRequest
        : isGoods
          ? Apis.usedGoods.postUsedGoodsComment
          : PostHoleDetailCommentRequest

      return func(params as any)
    }

    return {
      showInput,
      openInput,
      closeInput,
      isReply,
      form,
      data,
      reqFunc,
    }
  },
)
