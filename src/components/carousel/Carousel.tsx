import CarouselItem from './CarouselItem'
import { useSharedValue } from 'react-native-reanimated'
import { FlatList as GestureHandlerFlatList } from 'react-native-gesture-handler'

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
      style={{ margin: 8 }}
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      overScrollMode="never"
      scrollEventThrottle={16}
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
