import { StatusBar, View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useHoleCategoryList } from '@/swr/hole/category'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { HoleCategoryHeader } from '@/pages/hole/category/Header'
import { createRef, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { AnimatedToTopFAB } from '../ToTopFab'
import { AnimatedHolePostFAB } from '../PostFab'
import { ArticleCategoryEnum } from '@/shared/enums'
import { Page } from '@/components/Page'
import { useHoleList } from '@/swr/hole'
import { useStatusBarStyle } from '@/shared/hooks/useStatusBarStyle'

export function HoleCategoryScreen(props: { category: ArticleCategoryEnum }) {
  const query = useHoleCategoryList(props.category)
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
        ref={listRef}
        {...query}
        onScroll={scrollHandler}
        ListHeaderComponent={HoleCategoryHeader}
        categoryMode={'subcategory'}
      />
      <AnimatedHolePostFAB offset={PostFABOffset} />
      <AnimatedToTopFAB
        visible={isToTopFABVisible}
        goToTop={scrollToTopHandler}
      />
    </Page>
  )
}
