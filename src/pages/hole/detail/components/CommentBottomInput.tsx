import React from 'react'
import { Pressable, View } from 'react-native'
import { AtIcon, CameraIcon, EmojiIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import {
  IBottomCommentData,
  useBottomCommentContext,
} from '@/shared/context/hole/comment'
import { HoleLikeButton } from '@/pages/hole/components/HoleLikeButton'
import { useHoleDetail } from '@/swr/hole'

interface Props {
  data?: IBottomCommentData
}

export function CommentBottomInput(props: Props) {
  const { openInput } = useBottomCommentContext()
  const { data } = useHoleDetail()

  return (
    <>
      <Pressable
        className={'bg-white p-2 border-t-[1px] border-t-black/5'}
        onPress={() => openInput(props.data)}
      >
        <View className={'flex-row'}>
          <View
            className={
              'flex flex-1 flex-row items-center bg-[#f3f3f3] py-2 px-3 rounded-full space-x-3'
            }
          >
            <CameraIcon size={28} />
            <View className={'flex-1'}>
              <SecondaryText>你若安好便是晴天</SecondaryText>
            </View>
            <AtIcon size={28} />
            <EmojiIcon size={28} />
          </View>
          <View className={'flex-row items-center px-4'}>
            <HoleLikeButton size={28} data={data!} />
          </View>
        </View>
      </Pressable>
    </>
  )
}
