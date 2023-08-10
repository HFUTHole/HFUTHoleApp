import CarouselItem from './CarouselItem'
import { useSharedValue } from 'react-native-reanimated'
import { FlatList as GestureHandlerFlatList } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const LARGE_IMAGE_WIDTH = width * 0.45
const MEDIUM_IMAGE_WIDTH = LARGE_IMAGE_WIDTH * 0.75
const SMALL_IMAGE_WIDTH = MEDIUM_IMAGE_WIDTH * 0.34

export function Carousel({ data }) {
  const scrollX = useSharedValue(0)

  const scrollHandler = (event: {
    nativeEvent: { contentOffset: { x: number } }
  }) => {
    scrollX.value = event.nativeEvent.contentOffset.x
  }

  return (
    <GestureHandlerFlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      overScrollMode="never"
      scrollEventThrottle={16}
      snapToAlignment={'start'}
      snapToInterval={SMALL_IMAGE_WIDTH}
      decelerationRate={'normal'}

      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <CarouselItem
          uri={item.uri}
          text={item.text}
          scrollX={scrollX}
          index={index}
          dataLength={data.length}
        />
      )}
    />
  )
}
