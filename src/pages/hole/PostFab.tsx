import { useLinkTo } from '@react-navigation/native'
import { PostFAB } from '@/components/PostFAB'
import { useCallback } from 'react'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

export function HolePostFAB() {
  const linkTo = useLinkTo()

  const onPress = useCallback(() => {
    linkTo('/hole/post')
  }, [linkTo])

  return <PostFAB onPress={onPress} />
}

export function AnimatedHolePostFAB({ offset }) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(offset, {damping: 13}) }],
    }
  })

  return (
    <Animated.View style={animatedStyle}>
      <HolePostFAB />
    </Animated.View>
  )
}
