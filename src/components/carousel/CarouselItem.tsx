import { StyleSheet, Dimensions, Image, View } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useEffect } from 'react'
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const LARGE_IMAGE_WIDTH = width * 0.45
const MEDIUM_IMAGE_WIDTH = LARGE_IMAGE_WIDTH * 0.75
const SMALL_IMAGE_WIDTH = MEDIUM_IMAGE_WIDTH * 0.34

interface Props {
  uri: string
  text: string
  scrollX: any
  index: number
  dataLength: number
}

const CarouselItem = ({ uri, text, scrollX, index, dataLength }: Props) => {
  const inputRange = [
    (index - 2) * SMALL_IMAGE_WIDTH,
    (index - 1) * SMALL_IMAGE_WIDTH,
    index * SMALL_IMAGE_WIDTH,
    (index + 1) * SMALL_IMAGE_WIDTH,
  ]

  const isLastItem = dataLength === index + 1
  const isSecondLastItem = dataLength === index + 2

  const secondLastItemOutputRange = [
    SMALL_IMAGE_WIDTH,
    MEDIUM_IMAGE_WIDTH,
    MEDIUM_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
  ]

  const lastItemOutputRange = [
    SMALL_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
  ]

  const outputRange = isLastItem
    ? lastItemOutputRange
    : isSecondLastItem
    ? secondLastItemOutputRange
    : [
        SMALL_IMAGE_WIDTH,
        MEDIUM_IMAGE_WIDTH,
        LARGE_IMAGE_WIDTH,
        SMALL_IMAGE_WIDTH,
      ]

  const containerWidth = useSharedValue(SMALL_IMAGE_WIDTH)

  useDerivedValue(() => {
    containerWidth.value = interpolate(
      scrollX.value,
      inputRange,
      outputRange,
      'clamp'
    )
  })

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(scrollX.value, inputRange, outputRange, 'clamp')
    return {
      width,
    }
  })

  return (
    <Animated.View style={[styles.view, animatedStyle]}>
      <Image source={{ uri }} style={styles.image} />
      <View style={styles.textView}>
        <AnimatedText
          text={text}
          containerWidth={containerWidth}
          enterWidth={MEDIUM_IMAGE_WIDTH}
          exitWidth={LARGE_IMAGE_WIDTH}
        />
      </View>
    </Animated.View>
  )
}

interface AnimatedTextProps {
  text: string
  containerWidth: SharedValue<number>
  enterWidth: number
  exitWidth: number
}

function AnimatedText({
  text,
  containerWidth,
  enterWidth,
  exitWidth,
}: AnimatedTextProps) {
  const visible = useSharedValue(false)

  useAnimatedReaction(
    () => {
      return (
        containerWidth.value >= enterWidth && containerWidth.value <= exitWidth
      )
    },
    (isVisible) => {
      visible.value = isVisible
    }
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: visible.value
        ? withTiming(1, {
            duration: 100,
          })
        : withTiming(0, {
            duration: 100,
          }),
    }
  })

  return (
    <Animated.View
      style={[styles.animatedView, animatedStyle]} // pass the animated style to the view
    >
      <Text numberOfLines={2} variant={'titleMedium'} style={styles.text}>
        {text}
      </Text>
    </Animated.View>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
  view: {
    width: 250,
    marginRight: 8,
    borderRadius: 16,
    height: 160,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: LARGE_IMAGE_WIDTH,
    height: 200,
  },
  textView: {
    position: 'absolute',
    top: 80,
    left: 15,
    bottom: 15,
    width: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  animatedView: {
    opacity: 0,
  },
  text: {
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
})
