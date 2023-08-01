import WebView, { WebViewProps } from 'react-native-webview'
import { useParams } from '@/shared/hooks/useParams'
import React from 'react'
import { View } from 'react-native'

export function WebViewPage() {
  const { params } = useParams<{ params: WebViewProps }>()

  return (
    <View className={'h-screen w-screen'}>
      <WebView className={'w-full h-full'} {...params} />
    </View>
  )
}
