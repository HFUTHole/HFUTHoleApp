import { TopTabBar } from '@/components/router/TopTabBar'
import { IconButton } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React from 'react'
import { Func } from '@/shared/types'

interface Props extends MaterialTopTabBarProps {
  children?: React.ReactNode
  onRightPress?: Func
}

export function TopTabHeader({ children, onRightPress, ...props }: Props) {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[{ backgroundColor: 'transparent' }]}
      >
        <TopTabBar {...props} />
        <IconButton icon={() => children} onPress={onRightPress} />
      </ScrollView>
    </View>
  )
}
