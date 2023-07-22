import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { StatusBar } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

export function HoleMain() {
  const query = useHoleList()
  const theme = useTheme()

  return (
    <Page>
      <StatusBar backgroundColor={theme.colors.background} />
      <RefreshableHoleList {...query} />
    </Page>
  )
}
