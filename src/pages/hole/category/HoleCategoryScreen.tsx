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

export function HoleCategoryScreen(props: { category: ArticleCategoryEnum }) {
  const query = useHoleCategoryList(props.category)
  const listRef = createRef()

  const CONTENT_OFFSET_THRESHOLD = 500
  const PostFABOffset = useSharedValue(0)
  const [isToTopFABVisible, setToTopFABVisible] = useState(false)

  const scrollHandler = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
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
    <View className={'px-2 bg-background'}>
      <RefreshableHoleList
        {...query}
        ListHeaderComponent={HoleCategoryHeader}
        ref={listRef}
        onScroll={scrollHandler}
      />
      <AnimatedHolePostFAB offset={PostFABOffset.value} />
      <AnimatedToTopFAB
        visible={isToTopFABVisible}
        goToTop={scrollToTopHandler}
      />
    </View>
  )
}
