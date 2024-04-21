import { Page } from '@/components/Page'
import { HoleSearchHistory } from '@/pages/hole/search/history'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import React from 'react'

export function HoleSearch() {
  return (
    <Page>
      <HoleSearchHeader />
      <HoleSearchHistory />
    </Page>
  )
}
