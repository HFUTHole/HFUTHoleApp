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
import { useStatusBarStyle } from '@/shared/hooks/useStatusBarStyle'
import { Carousel } from '../../../components/carousel/Carousel'
import { sampleData } from '@/components/carousel/data'

export function HoleMain() {
  const query = useHoleList()
  const theme = useTheme()
  const listRef = createRef()

  const CONTENT_OFFSET_THRESHOLD = 500
  const [PostFABOffset, setPostFABOffset] = useState(0)
  const [isToTopFABVisible, setToTopFABVisible] = useState(false)

  useStatusBarStyle({
    themeKey: 'background',
  })

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
      <RefreshableHoleList
        ListHeaderComponent={<Carousel data={sampleData} />}
        ref={listRef}
        {...query}
        onScroll={scrollHandler}
        categoryMode={'category'}
      />
      <AnimatedHolePostFAB
        offset={PostFABOffset}
        bgColor={theme.colors.primary}
      />
      <AnimatedToTopFAB
        visible={isToTopFABVisible}
        goToTop={scrollToTopHandler}
        bgColor={theme.colors.primary}
      />
    </Page>
  )
}
