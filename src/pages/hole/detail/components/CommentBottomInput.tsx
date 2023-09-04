import React from 'react'
import { Pressable, View } from 'react-native'
import { AtIcon, CameraIcon, EmojiIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import {
  IBottomCommentData,
  useBottomCommentContext,
} from '@/shared/context/hole/comment'

interface Props {
  data?: IBottomCommentData
}

export function CommentBottomInput(props: Props) {
  const { openInput } = useBottomCommentContext()

  return (
    <>
      <Pressable
        className={'bg-white p-2 border-t-[1px] border-t-black/5'}
        onPress={() => openInput(props.data)}
      >
        <View
          className={
            'flex flex-row items-center bg-[#f3f3f3] py-2 px-3 rounded-full space-x-3'
          }
        >
          <CameraIcon size={24} />
          <View className={'flex-1'}>
            <SecondaryText>你若安好便是晴天</SecondaryText>
          </View>
          <AtIcon size={24} />
          <EmojiIcon size={24} />
        </View>
      </Pressable>
    </>
  )
}
