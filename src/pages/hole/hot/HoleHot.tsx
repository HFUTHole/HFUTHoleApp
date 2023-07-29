import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { RefreshableHoleList } from '../components/HoleList'
import { StatusBar } from 'react-native'
import React, { createRef, useRef, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { AnimatedToTopFAB } from '../ToTopFab'
import { AnimatedHolePostFAB } from '../PostFab'
import { useSharedValue } from 'react-native-reanimated'

export function HoleHot() {
  const query = useHoleList()
  const theme = useTheme()
  const listRef = createRef()

  const CONTENT_OFFSET_THRESHOLD = 500
  const PostFABOffset = useSharedValue(0)
  const [isToTopFABVisible, setToTopFABVisible] = useState(false)

  const scrollHandler = (event) => {
    if (event.nativeEvent.contentOffset.y > CONTENT_OFFSET_THRESHOLD) {
      PostFABOffset.value = -70
      setToTopFABVisible(true)
    } else {
      setToTopFABVisible(false)
      PostFABOffset.value = 0
    }
  }

  const scrollToTopHandler = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <Page>
      <StatusBar backgroundColor={theme.colors.background} />
      <RefreshableHoleList {...query} ref={listRef} onScroll={scrollHandler} />
      <AnimatedHolePostFAB offset={PostFABOffset.value} />
      <AnimatedToTopFAB
        visible={isToTopFABVisible}
        goToTop={scrollToTopHandler}
      />
    </Page>
  )
}
