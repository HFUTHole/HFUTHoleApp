import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { RefreshableHoleList } from '../components/HoleList'
import React, { createRef, useState } from 'react'
import { AnimatedToTopFAB } from '../ToTopFab'
import { AnimatedHolePostFAB } from '../PostFab'
import { useStatusBarStyle } from '@/shared/hooks/useStatusBarStyle'

export function HoleHot() {
  const query = useHoleList()
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
      <RefreshableHoleList ref={listRef} {...query} onScroll={scrollHandler} />
      <AnimatedHolePostFAB offset={PostFABOffset} />
      <AnimatedToTopFAB
        visible={isToTopFABVisible}
        goToTop={scrollToTopHandler}
      />
    </Page>
  )
}
