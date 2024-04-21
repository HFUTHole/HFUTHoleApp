import { HoleSearchHeader } from '@/pages/hole/search/header'
import { HoleSearch } from '@/pages/hole/search/search'
import { HoleSearchResult } from '@/pages/hole/search/result/result'
import React from 'react'
import { HoleStack } from './hole-nested.stacks'
import { PageWithSafeArea } from '@/layouts/layout'

export const HoleSearchStacks = () => {
  return (
    <PageWithSafeArea>
      <HoleStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HoleStack.Screen name={'index'} component={HoleSearch} />
        <HoleStack.Screen name={'result'} component={HoleSearchResult} />
      </HoleStack.Navigator>
    </PageWithSafeArea>
  )
}
