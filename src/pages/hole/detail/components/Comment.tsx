import { View } from 'react-native'
import { HoleDetailCommentList } from '@/pages/hole/detail/components/CommentList'
import React from 'react'
import { CommentBottomInput } from '@/pages/hole/detail/components/CommentBottomInput'

export function HoleDetailComment() {
  return (
    <View className={'h-full'}>
      <HoleDetailCommentList />
      <CommentBottomInput />
    </View>
  )
}
