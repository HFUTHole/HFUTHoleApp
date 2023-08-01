import { View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useHoleCategoryList } from '@/swr/hole/category'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { HoleCategoryHeader } from '@/pages/hole/category/Header'
import { createRef, useState } from 'react'
import { AnimatedToTopFAB } from '../ToTopFab'
import { AnimatedHolePostFAB } from '../PostFab'

export function HoleCategoryScreen() {
  const query = useHoleCategoryList()
  const listRef = createRef()

  const CONTENT_OFFSET_THRESHOLD = 500
  const [PostFABOffset, setPostFABOffset] = useState(0)
  const [isToTopFABVisible, setToTopFABVisible] = useState(false)

  const scrollHandler = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    if (event.nativeEvent.contentOffset.y > CONTENT_OFFSET_THRESHOLD) {
      setPostFABOffset(-70)
      setToTopFABVisible(true)
    } else {
      setToTopFABVisible(false)
      setPostFABOffset(0)
    }
  }

  const scrollToTopHandler = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <LoadingScreen isLoading={query.isLoading} id={1}>
      <View className={'px-2 bg-background'}>
        <RefreshableHoleList
          {...query}
          ListHeaderComponent={HoleCategoryHeader}
          ref={listRef}
          onScroll={scrollHandler}
        />
        <AnimatedHolePostFAB offset={PostFABOffset} />
        <AnimatedToTopFAB
          visible={isToTopFABVisible}
          goToTop={scrollToTopHandler}
        />
      </View>
    </LoadingScreen>
  )
}
