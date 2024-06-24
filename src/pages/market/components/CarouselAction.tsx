import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import {
  FlatList as GestureHandlerFlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { Pressable, Text, View, Image } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { ScreenWidth } from '@/shared/utils/utils'
import { useMemo, useRef } from 'react'
import clsx from 'clsx'

export interface CarouselActionProps<T> {
  data: T[]
  height?: number
  numOfColumns?: number
  renderItem: (item: T) => React.ReactNode
}

interface PaginationProps<T> {
  data: T[]
  progress: SharedValue<number>
  onPress: (index: number) => void
}

const CustomPaginationDot = ({
  progress,
  index,
}: {
  progress: SharedValue<number>
  index: number
}) => {
  const distance = useDerivedValue(() => {
    return Math.abs(progress.value - index)
  })
  const isActive = useDerivedValue(() => {
    return distance.value <= 1
  })

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      width: isActive.value ? 4 + 6 * (1 - distance.value) : 4,
      height: 4,
      borderRadius: 50,
      //   backgroundColor: isActive.value ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)',
      backgroundColor: isActive.value
        ? `rgba(0,0,0,${0.1 + 0.2 * (1 - distance.value)})`
        : 'rgba(0,0,0,0.1)',
    }
  })

  return <Animated.View style={[animatedDotStyle]} />
}

const CustomPagination = <T,>({
  data,
  progress,
  onPress,
}: PaginationProps<T>) => {
  return (
    <View className="flex-row items-center justify-center space-x-1">
      {data.map((_, index) => (
        <Pressable key={index} onPress={() => onPress(index)}>
          <CustomPaginationDot progress={progress} index={index} />
        </Pressable>
      ))}
    </View>
  )
}

export const CarouselAction = <T extends any>(
  props: CarouselActionProps<T>,
) => {
  const { data, height = 88, renderItem, numOfColumns = 4 } = props
  const scrollX = useSharedValue(0)

  const scrollHandler = (event: {
    nativeEvent: { contentOffset: { x: number } }
  }) => {
    scrollX.value = event.nativeEvent.contentOffset.x
  }

  const chunkedData = useMemo(() => {
    const chunkedData = []
    for (let i = 0; i < data.length; i += numOfColumns) {
      chunkedData.push(data.slice(i, i + numOfColumns))
    }
    return chunkedData
  }, [data, numOfColumns])

  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    })
  }

  return (
    <View className={'flex-1'}>
      <Carousel
        ref={ref}
        loop={false}
        width={ScreenWidth * 0.9}
        height={height}
        data={chunkedData}
        onProgressChange={(offset, absolute) => {
          progress.value = absolute
        }}
        renderItem={({ item: chunk }) => {
          //   return <Pressable className={'flex-1'}>{renderItem(item)}</Pressable>
          return (
            <View className={'flex-row px-3'}>
              {chunk.map((item, index) => (
                <Pressable key={index} className={`flex-1`}>
                  {renderItem(item)}
                </Pressable>
              ))}
            </View>
          )
        }}
        //   onSnapToItem={(index) => setActiveIndex(index)}
      />
      <CustomPagination
        progress={progress}
        data={chunkedData}
        // dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
        // containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  )
}
