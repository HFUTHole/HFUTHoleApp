import { StyleSheet, Dimensions, Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const LARGE_IMAGE_WIDTH = width * 0.45
const MEDIUM_IMAGE_WIDTH = LARGE_IMAGE_WIDTH * 0.7
const SMALL_IMAGE_WIDTH = MEDIUM_IMAGE_WIDTH * 0.35

const CarouselItem = ({ uri, text, scrollX, index, dataLength }) => {
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
    SMALL_IMAGE_WIDTH,
  ]

  const lastItemOutputRange = [
    SMALL_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
    LARGE_IMAGE_WIDTH,
    SMALL_IMAGE_WIDTH,
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
    const width = containerWidth.value
    return {
      width,
    }
  })

  return (
    <Animated.View style={[styles.view, animatedStyle]}>
      <Image source={{ uri }} style={styles.image} />
      <View style={styles.textview}>
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

function AnimatedText({ text, containerWidth, enterWidth, exitWidth }) {
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
            duration: 200,
          })
        : withTiming(0, {
            duration: 200,
          }),
    }
  })

  return (
    <Animated.View
      style={[styles.animatedview, animatedStyle]} // pass the animated style to the view
    >
      <Text numberOfLines={2} style={styles.text}>
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
    borderRadius: 15,
    height: 200,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: LARGE_IMAGE_WIDTH,
    height: 200,
  },
  textview: {
    position: 'absolute',
    top: 120,
    left: 15,
    right: 15,
    bottom: 15,
    width: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  animatedview: {
    opacity: 0,
  },
  text: {
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontSize: 17,
    fontWeight: 'normal',
  },
})
