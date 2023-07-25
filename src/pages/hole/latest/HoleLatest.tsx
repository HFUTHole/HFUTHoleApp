import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { HomeCategories } from '@/pages/hole/Category'
import { HolePostFAB } from '@/pages/hole/PostFab'
import React, { createRef, useCallback, useRef } from 'react'
import { GestureResponderEvent, StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import { HoleToTopFAB } from '../ToTopFab'
import { RefreshableHoleList } from '../components/HoleList'
import Animated, { useSharedValue } from 'react-native-reanimated'

export function HoleLatest() {
  const query = useHoleList()
  const theme = useTheme()
  const listRef = createRef()

  const scrollPosition = useSharedValue(0)

  const scrollHandler = useCallback(
    (event) => {
      scrollPosition.value = event.nativeEvent.contentOffset.y
    },
    [scrollPosition]
  )

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
      <HolePostFAB />
      {scrollPosition.value > 100 ? (
        <HoleToTopFAB goToTop={scrollToTopHandler} />
      ) : undefined}
    </Page>
  )
}
