import { Alert, View } from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useState } from 'react'
import { HolePostHeader } from '@/pages/hole/post/header'
import { HolePostForm } from '@/pages/hole/post/Form'
import { PostLeaveDialog } from '@/pages/hole/post/PostLeaveDialog'

export function HolePostBody() {
  const [bottomHeight, setBottomHeight] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)

  return (
    <View>
      <PostLeaveDialog />
      <View className={'px-2'}>
        <View
          onLayout={(e) => {
            setHeaderHeight(e.nativeEvent.layout.height)
          }}
        >
          <HolePostHeader />
        </View>
        <HolePostForm bottomHeight={bottomHeight} headerHeight={headerHeight} />
      </View>
      <View
        onLayout={(e) => {
          setBottomHeight(e.nativeEvent.layout.height)
        }}
        className={'bg-white'}
      >
        <BottomActions />
      </View>
    </View>
  )
}
