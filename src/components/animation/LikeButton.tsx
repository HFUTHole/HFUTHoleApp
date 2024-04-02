import React, { useCallback, useState } from 'react'
import { UseMutationResult } from 'react-query'
import { useTheme } from 'react-native-paper'
import Animated, {
  BounceIn,
  BounceOut,
  Extrapolate,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SecondaryText } from '@/components/Text/SecondaryText'

export type AnimatedLikeButtonDataType = {
  isLiked: boolean
  favoriteCounts: number
}

export interface AnimatedLikeButtonProps {
  data: AnimatedLikeButtonDataType
  mutation: UseMutationResult<unknown, unknown, boolean, unknown>
  size?: number
}

export const AnimatedLikeButton: React.FC<AnimatedLikeButtonProps> = (
  props,
) => {
  const { mutation, data, size = 16 } = props
  const theme = useTheme()
  const [liked, setLiked] = useState(data.isLiked)
  const [favoriteCount, setFavoriteCount] = useState(data.favoriteCounts)

  const likedInput = useDerivedValue(() => withSpring(liked ? 1 : 0), [liked])

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            likedInput.value,
            [0, 1],
            [1, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: likedInput.value,
        },
      ],
      opacity: likedInput.value,
    }
  })

  const onLikeIconPress = useCallback(() => {
    setLiked((prev) => !prev)
    setFavoriteCount((prev) => (liked ? prev - 1 : prev + 1))
    console.log(liked)
    mutation.mutate(liked, {
      onError() {
        setFavoriteCount((prev) => prev - 1)
        setLiked(!liked)
      },
    })
  }, [liked, mutation])

  return (
    <Pressable onPress={onLikeIconPress}>
      <View className={'flex-row items-center flex-1 space-x-1'}>
        {!liked ? (
          <Animated.View
            entering={BounceIn.delay(250)}
            exiting={BounceOut.duration(200)}
            className={'flex-row items-center'}
          >
            <MaterialCommunityIcons
              name={'heart-outline'}
              size={size}
              color={theme.colors.surfaceVariant}
            />
          </Animated.View>
        ) : (
          <></>
        )}

        {liked ? (
          <Animated.View
            entering={BounceIn.delay(250)}
            exiting={BounceOut.duration(200)}
            className={'flex-row space-x-1 items-center'}
          >
            <MaterialCommunityIcons
              name={'heart'}
              size={size}
              color={theme.colors.error}
            />
          </Animated.View>
        ) : (
          <></>
        )}
        <Text className={'text-xs text-black/75'} style={{ fontSize: 12 }}>
          {favoriteCount}
        </Text>
      </View>
    </Pressable>
  )
}
