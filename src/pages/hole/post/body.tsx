import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useState } from 'react'
import { HolePostHeader } from '@/pages/hole/post/header'
import { HolePostForm } from '@/pages/hole/post/Form'
import { PostLeaveDialog } from '@/pages/hole/post/PostLeaveDialog'
import { App } from '@/shared/utils/App'

export function HolePostBody() {
  return (
    <KeyboardAvoidingView
      className={'flex-1 '}
      behavior={App.keyboardAvoidingBehavior}
    >
      <View className={'flex-1'}>
        <PostLeaveDialog />
        <View className={'px-2 flex-1'}>
          <View>
            <HolePostHeader />
          </View>
          <HolePostForm />
        </View>
      </View>
      <BottomActions />
    </KeyboardAvoidingView>
  )
}
