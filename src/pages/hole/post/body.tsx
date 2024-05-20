import { Alert, KeyboardAvoidingView, TextInput, View } from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useState } from 'react'
import { HolePostHeader } from '@/pages/hole/post/header'
import { HolePostForm } from '@/pages/hole/post/Form'
import { PostLeaveDialog } from '@/pages/hole/post/PostLeaveDialog'
import { App } from '@/shared/utils/App'

export function HolePostBody() {
  return (
    <View className={'flex-1 justify-between'}>
      <View className={'flex-1'}>
        <PostLeaveDialog />
        <View className={'px-2'}>
          <View>
            <HolePostHeader />
          </View>
          <HolePostForm />
        </View>
      </View>
      <KeyboardAvoidingView
        className={''}
        behavior={App.keyboardAvoidingBehavior}
      >
        <BottomActions />
      </KeyboardAvoidingView>
    </View>
  )
}
