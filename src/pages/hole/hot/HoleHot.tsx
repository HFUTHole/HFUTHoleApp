import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { RefreshableHoleList } from '../components/HoleList'
import { StatusBar } from 'react-native'
import React, { createRef, useRef } from 'react'
import { useTheme } from 'react-native-paper'
import { HoleToTopFAB } from '../ToTopFab'
import { HolePostFAB } from '../PostFab'

export function HoleHot() {
  const query = useHoleList()
  const theme = useTheme()
  const listRef = createRef()

  const scrollToTopHandler = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <Page>
      <StatusBar backgroundColor={theme.colors.background} />
      <RefreshableHoleList {...query} ref={listRef} />
      <HolePostFAB />
      <HoleToTopFAB goToTop={scrollToTopHandler} />
    </Page>
  )
}
