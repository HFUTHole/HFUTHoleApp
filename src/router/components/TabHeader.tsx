import { TopTabBar } from '@/components/router/TopTabBar'
import { IconButton, useTheme } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React, { createRef, useRef } from 'react'
import { Func } from '@/shared/types'
import { SearchIcon } from '@/components/icon'
import { SubCategoryTabBar } from '@/components/router/SubCategoryTabBar'
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'

interface Props extends MaterialTopTabBarProps {
  children?: React.ReactNode
  onRightPress?: Func
}

export function TopTabHeader({ children, onRightPress, ...props }: Props) {
  const theme = useTheme()
  const scrollRef = useRef<ScrollView>(null)

  const scrollToXHandler = (x: number) => {
    scrollRef.current.scrollTo({ x: x, animated: true })
  }
  return (
    <View className={'flex-row'}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[{ backgroundColor: theme.colors.background }]}
        ref={scrollRef}
      >
        <TopTabBar {...props} scrollToXHandler={scrollToXHandler} />
      </ScrollView>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: theme.colors.background,
          padding: 5,
          shadowColor: theme.colors.background,
          shadowRadius: 50,
        }}
      >
        <IconButton icon={SearchIcon} onPress={onRightPress} />
      </View>
    </View>
  )
}

interface SubCategoryTabProps extends MaterialTopTabBarProps {
  children?: React.ReactNode
  onRightPress?: Func
  categoryColors: any
}

export function SubCategoryTabHeader({
  children,
  onRightPress,
  categoryColors,
  ...props
}: SubCategoryTabProps) {
  const theme = useTheme()
  return (
    <View className={'flex-row'}>
      <GestureHandlerScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { backgroundColor: theme.colors.background, width: '100%' },
        ]}
      >
        <SubCategoryTabBar categoryColors={categoryColors} {...props} />
      </GestureHandlerScrollView>
    </View>
  )
}

export function ModeTabHeader({ children, onRightPress, ...props }: Props) {
  const theme = useTheme()
  return (
    <View className={'flex-row'}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { backgroundColor: theme.colors.background, width: '100%' },
        ]}
      >
        {/* <TopTabBar {...props} /> */}
      </ScrollView>
    </View>
  )
}
