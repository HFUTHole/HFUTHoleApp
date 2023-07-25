import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { HomeCategories } from '@/pages/hole/Category'
import { AnimatedHolePostFAB, HolePostFAB } from '@/pages/hole/PostFab'
import React, { createRef, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import { AnimatedToTopFAB } from '../ToTopFab'
import { RefreshableHoleList } from '../components/HoleList'
import { ToTopFAB } from '@/components/ToTopFAB'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

export function HoleLatest() {
  const query = useHoleList()
  const theme = useTheme()
  const listRef = createRef()
  const CONTENT_OFFSET_THRESHOLD = 500

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0)
  const PostFABOffset = useSharedValue(0)
  const [isToTopFABVisible, setToTopFABVisible] = useState(false)
  const [isBackToTop, setBackToTop] = useState(false)

  const scrollHandler = (event) => {
    setContentVerticalOffset(event.nativeEvent.contentOffset.y)
  }

  const scrollToTopHandler = () => {
    setBackToTop(true)
    listRef.current.scrollToOffset({ offset: 0, animated: true })
  }

  useEffect(() => {
    if (isBackToTop) {
      setToTopFABVisible(false)
      PostFABOffset.value = 0
      setBackToTop(false)
    }
    if (contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && !isBackToTop) {
      setToTopFABVisible(true)
      PostFABOffset.value = -70
      setBackToTop(false)
    } else {
      setToTopFABVisible(false)
      PostFABOffset.value = 0
    }
  }, [isBackToTop, PostFABOffset, isToTopFABVisible, contentVerticalOffset])

  return (
    <Page>
      <StatusBar backgroundColor={theme.colors.background} />
      <RefreshableHoleList
        ListHeaderComponent={HomeCategories}
        ref={listRef}
        {...query}
        onScroll={scrollHandler}
      />
      <AnimatedHolePostFAB offset={PostFABOffset.value} />
      <AnimatedToTopFAB
        visible={isToTopFABVisible}
        goToTop={scrollToTopHandler}
      />
    </Page>
  )
}
