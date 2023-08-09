import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Pressable, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import React, { useCallback } from 'react'

interface SubCategoryTabBarProps extends MaterialTopTabBarProps {
  jumpTo: (key: string) => void
  categoryColors: any
}

export function SubCategoryTabBar({
  state,
  descriptors,
  jumpTo,
  categoryColors,
}: SubCategoryTabBarProps) {
  const handlePress = useCallback(
    (route: string) => {
      jumpTo(route)
    },
    [jumpTo]
  )

  return (
    <View className={'flex-row px-3 pb-2 bg-transparent'}>
      {state.routes.map((route, index) => {
        const options = descriptors[route.key].options

        return (
          <TabBarItem
            key={route.key}
            onPress={() => handlePress(route.key)}
            isFocused={state.index === index}
            name={options.title!}
            categoryColors={categoryColors}
          />
        )
      })}
    </View>
  )
}

const TabBarItem = ({
  onPress,
  isFocused,
  name,
  categoryColors,
}: {
  onPress: any
  isFocused: boolean
  name: string
  categoryColors: any
}) => {
  const theme = useTheme()

  const Animation = {
    active: {
      textColor: categoryColors.primary,
      chipColor: categoryColors.secondary,
    },
    inactive: {
      textColor: theme.colors.surfaceVariant,
      chipColor: '#FFFFFF',
    },
  }

  const textColor = useDerivedValue(
    () =>
      isFocused ? Animation.active.textColor : Animation.inactive.textColor,
    [isFocused]
  )

  const chipColor = useDerivedValue(
    () =>
      isFocused ? Animation.active.chipColor : Animation.inactive.chipColor,
    [isFocused]
  )

  const textStyle = useAnimatedStyle(() => {
    return {
      lineHeight: 22,
      fontSize: 16,
      color: textColor.value,
      fontWeight: isFocused ? 'bold' : 'normal',
    }
  })

  const chipStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: chipColor.value,
    }
  })

  return (
    <Animated.View
      className={'rounded-full px-3 py-2 mr-2 mb-2 items-center'}
      style={chipStyle}
    >
      <Pressable onPress={onPress}>
        <Animated.Text
          style={textStyle}
          numberOfLines={1}
          ellipsizeMode={'clip'}
        >
          {name}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  )
}
