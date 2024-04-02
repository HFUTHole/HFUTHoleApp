import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'
import { KeyboardAvoidingView, TextInput, View } from 'react-native'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export function AvoidingKeyboardVisible(props: Props) {
  const height = useKeyboardHeight()

  return (
    <KeyboardAvoidingView className={'flex-1'} behavior={'height'}>
      <View className={'flex-1 bg-black'}></View>
    </KeyboardAvoidingView>
  )
}
