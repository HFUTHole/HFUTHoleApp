import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Pressable, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import React, { useCallback, useState } from 'react'

interface TopTabBarProps extends MaterialTopTabBarProps {
  jumpTo: (key: string) => void
  scrollToXHandler: (x: number) => void
}

export function TopTabBar({
  state,
  descriptors,
  jumpTo,
  scrollToXHandler,
}: TopTabBarProps) {
  const handlePress = useCallback(
    (route: string) => {
      jumpTo(route)
    },
    [jumpTo]
  )

  return (
    <View
      className={'flex-row space-x-5 px-6 py-2 items-center bg-transparent'}
    >
      {state.routes.map((route, index) => {
        const options = descriptors[route.key].options

        return (
          <TabBarItem
            key={route.key}
            scrollToXHandler={scrollToXHandler}
            onPress={() => handlePress(route.key)}
            isFocused={state.index === index}
            name={options.title!}
            Icon={options.tabBarIcon!}
            tabBarShowLabel={options.tabBarShowLabel!}
          />
        )
      })}
    </View>
  )
}

const TabBarItem = ({
  scrollToXHandler,
  onPress,
  isFocused,
  name,
  Icon,
  tabBarShowLabel,
}: {
  scrollToXHandler: (x: number) => void
  onPress: any
  isFocused: boolean
  name: string
  Icon: (props: { focused: boolean; color: string }) => React.ReactNode
  tabBarShowLabel: boolean
}) => {
  const theme = useTheme()
  const showLabel = tabBarShowLabel
  const [offset, setOffset] = useState<number>(0)

  const Animation = {
    active: {
      color: '#000',
      fontScale: showLabel ? 1.5 : 0,
      labelWidth: showLabel ? 24 * name.length : 0,
    },
    inactive: {
      color: theme.colors.surfaceVariant,
      fontScale: 1,
      labelWidth: 18 * name.length,
    },
  }

  const color = useDerivedValue(
    () => (isFocused ? Animation.active.color : Animation.inactive.color),
    [isFocused]
  )

  const fontScale = useDerivedValue(
    () =>
      isFocused ? Animation.active.fontScale : Animation.inactive.fontScale,
    [isFocused]
  )

  const labelWidth = useDerivedValue(
    () =>
      isFocused ? Animation.active.labelWidth : Animation.inactive.labelWidth,
    [isFocused]
  )

  const textStyle = useAnimatedStyle(() => {
    return {
      lineHeight: 20,
      fontSize: 16,
      color: withTiming(color.value),
      fontWeight: isFocused ? 'bold' : 'normal',
    }
  })

  const textViewStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(labelWidth.value, { damping: 30 }, () => {
        if (isFocused && offset % 1 === 0) {
          runOnJS(scrollToXHandler)(offset)
        }
      }),
      height: 20,
      transform: [
        {
          scale: withSpring(fontScale.value, { damping: 30 }),
        },
      ],
    }
  })

  return (
    <Pressable
      onPress={onPress}
      className={'px-1'}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout
        setOffset(layout.x - 16)
      }}
    >
      <View className={'flex-row items-center space-x-1'}>
        <Icon focused={isFocused} color="#000000" />
        <Animated.View style={textViewStyle} className={'items-center'}>
          <Animated.Text
            style={textStyle}
            numberOfLines={1}
            ellipsizeMode={'clip'}
          >
            {name}
          </Animated.Text>
        </Animated.View>
      </View>
    </Pressable>
  )
}
