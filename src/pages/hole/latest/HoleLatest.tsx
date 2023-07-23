import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { HomeCategories } from '@/pages/hole/Category'
import { HolePostFAB } from '@/pages/hole/PostFab'
import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'

export function HoleLatest() {
  const query = useHoleList()
  const theme = useTheme()

  return (
    <Page>
      <StatusBar backgroundColor={theme.colors.background} />
      <RefreshableHoleList {...query} ListHeaderComponent={HomeCategories} />
      <HolePostFAB />
    </Page>
  )
}
