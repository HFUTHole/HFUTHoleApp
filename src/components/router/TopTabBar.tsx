import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Pressable, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useLinkTo } from '@react-navigation/native'
import React, { useCallback } from 'react'

export function TopTabBar({
  state,
  descriptors,
  jumpTo,
}: MaterialTopTabBarProps) {
  const handlePress = useCallback(
    (route: string) => {
      jumpTo(route)
    },
    [jumpTo]
  )

  return (
    <View
      className={'flex-row space-x-3 px-6 py-2 items-center bg-transparent'}
    >
      {state.routes.map((route, index) => {
        const options = descriptors[route.key].options

        return (
          <Pressable key={route.key} onPress={() => handlePress(route.key)}>
            <TabBarItem
              isFocused={state.index === index}
              name={options.title!}
              Icon={options.tabBarIcon!}
            />
          </Pressable>
        )
      })}
    </View>
  )
}

const TabBarItem = ({
  isFocused,
  name,
  Icon,
}: {
  isFocused: boolean
  name: string
  Icon: (props: { focused: boolean; color: string }) => React.ReactNode
}) => {
  const theme = useTheme()

  const Animation = {
    active: {
      color: '#000',
      fontSize: 24,
    },
    inactive: {
      color: theme.colors.surfaceVariant,
      fontSize: 16,
    },
  }

  const color = useDerivedValue(
    () => (isFocused ? Animation.active.color : Animation.inactive.color),
    [isFocused]
  )

  const fontSize = useDerivedValue(
    () => (isFocused ? Animation.active.fontSize : Animation.inactive.fontSize),
    [isFocused]
  )

  const textStyle = useAnimatedStyle(() => {
    return {
      lineHeight: 32,
      fontSize: withSpring(fontSize.value),
      color: withTiming(color.value),
      fontWeight: isFocused ? 'bold' : 'normal',
    }
  })

  return (
    <View className={'flex-row items-center space-x-1'}>
      <Icon focused={isFocused} color="#000000" />
      <Animated.View>
        <Animated.Text style={textStyle}>{name}</Animated.Text>
      </Animated.View>
    </View>
  )
}
