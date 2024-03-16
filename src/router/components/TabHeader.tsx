import { TopTabBar } from '@/components/router/TopTabBar'
import { IconButton, useTheme } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React from 'react'
import { Func } from '@/shared/types'
import { SubCategoryTabBar } from '@/components/router/SubCategoryTabBar'
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'

interface Props extends MaterialTopTabBarProps {}

export function TopTabHeader({ ...props }: Props) {
  const theme = useTheme()

  return (
    <View className={'flex-row w-full'}>
      <ScrollView
        className={'flex-1 bg-background'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[{ backgroundColor: theme.colors.background }]}
      >
        <TopTabBar {...props} />
      </ScrollView>
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
