import { useLinkTo } from '@react-navigation/native'
import { PostFAB } from '@/components/PostFAB'
import { useCallback } from 'react'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Func } from '@/shared/types'

export function AnimatedHolePostFAB({
  offset,
  ...props
}: {
  offset: number
  onPress?: Func
}) {
  const linkTo = useLinkTo()

  const onPress = useCallback(() => {
    if (props.onPress) {
      props.onPress()
    } else {
      linkTo('/hole/post')
    }
  }, [linkTo])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(offset) }],
    }
  }, [offset])

  return (
    <Animated.View style={animatedStyle}>
      <PostFAB onPress={onPress} />
    </Animated.View>
  )
}
