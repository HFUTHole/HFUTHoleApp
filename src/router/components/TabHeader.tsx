import { TopTabBar } from '@/components/router/TopTabBar'
import { IconButton, useTheme } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React from 'react'
import { Func } from '@/shared/types'
import { SearchIcon } from '@/components/icon'

interface Props extends MaterialTopTabBarProps {
  children?: React.ReactNode
  onRightPress?: Func
}

export function TopTabHeader({ children, onRightPress, ...props }: Props) {
  const theme = useTheme()
  return (
    <View className={'flex-row'}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[{ backgroundColor: theme.colors.background }]}
      >
        <TopTabBar {...props} />
      </ScrollView>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: theme.colors.background,
          padding: 5,
        }}
      >
        <IconButton icon={SearchIcon} onPress={onRightPress} />
      </View>
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
        contentContainerStyle={[{ backgroundColor: theme.colors.background }]}
      >
        <TopTabBar {...props} />
      </ScrollView>
    </View>
  )
}
