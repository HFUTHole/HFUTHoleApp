import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { HomeCategories } from '@/pages/hole/Category'
import { AnimatedHolePostFAB, HolePostFAB } from '@/pages/hole/PostFab'
import React, { createRef, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import { AnimatedToTopFAB } from '../ToTopFab'
import { RefreshableHoleList } from '../components/HoleList'
import { useSharedValue } from 'react-native-reanimated'

export function HoleLatest() {
  const query = useHoleList()
  const theme = useTheme()
  const listRef = createRef()

  const CONTENT_OFFSET_THRESHOLD = 500
  const [PostFABOffset, setPostFABOffset] = useState(0)
  const [isToTopFABVisible, setToTopFABVisible] = useState(false)

  const scrollHandler = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    if (event.nativeEvent.contentOffset.y > CONTENT_OFFSET_THRESHOLD) {
      {
        setPostFABOffset(-70)
        setToTopFABVisible(true)
      }
    } else {
      {
        setToTopFABVisible(false)
        setPostFABOffset(0)
      }
    }
  }

  const scrollToTopHandler = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <Page>
      <StatusBar backgroundColor={theme.colors.background} />
      <RefreshableHoleList
        ListHeaderComponent={HomeCategories}
        ref={listRef}
        {...query}
        onScroll={scrollHandler}
      />
      <AnimatedHolePostFAB offset={PostFABOffset} />
      <AnimatedToTopFAB
        visible={isToTopFABVisible}
        goToTop={scrollToTopHandler}
      />
    </Page>
  )
}
