import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { greetingText } from '@/shared/utils/utils'
import React from 'react'

export function Separator() {
  const theme = useTheme()

  return (
    <View
      className={'h-[1px] w-full'}
      style={{ backgroundColor: theme.colors.background }}
    />
  )
}

export function DashBorderSeparator({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()

  return (
    <View
      className={'border-b-[1px] border-dashed pb-3'}
      style={{ borderColor: theme.colors.onBackground }}
    >
      {children}
    </View>
  )
}
