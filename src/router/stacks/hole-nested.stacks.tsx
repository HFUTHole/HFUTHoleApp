import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'
import { HolePost } from '@/pages/hole/post/post'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HoleSearchStacks } from '@/router/stacks/hole-search.stacks'
import { HoleDetailStacks } from '@/router/stacks/hole-detail.stacks'
import { HoleCategoryStacks } from '@/router/stacks/hole-category.stacks'
import { PageWithSafeArea } from '@/layouts/layout'

export const HoleStack = createNativeStackNavigator()

export const HoleNestedStacks = () => {
  return (
    <HoleDetailCommentContextProvider>
      <HoleStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HoleStack.Screen name={'post'} component={HolePost} />
        <HoleStack.Screen name={'search'} component={HoleSearchStacks} />
        <HoleStack.Screen name={'detail'} component={HoleDetailStacks} />
        <HoleStack.Screen name={'category'} component={HoleCategoryStacks} />
      </HoleStack.Navigator>
    </HoleDetailCommentContextProvider>
  )
}
