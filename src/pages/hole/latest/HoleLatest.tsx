import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { HomeCategories } from '@/pages/hole/Category'
import { HolePostFAB } from '@/pages/hole/PostFab'
import React, { createRef, useRef } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import { HoleToTopFAB } from '../ToTopFab'
import { RefreshableHoleList } from '../components/HoleList'

export function HoleLatest() {
  const query = useHoleList()
  const theme = useTheme()
  const listRef = createRef()

  const scrollToTopHandler = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <Page>
      <StatusBar backgroundColor={theme.colors.background} />
      <RefreshableHoleList
        {...query}
        ListHeaderComponent={HomeCategories}
        ref={listRef}
      />
      <HoleToTopFAB goToTop={scrollToTopHandler} />
      <HolePostFAB />
    </Page>
  )
}
