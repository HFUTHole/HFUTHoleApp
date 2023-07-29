import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabs, UserStacks } from '@/router/BottomTabs'
import { HoleNestedStacks } from '@/router/TopTabs'
import { NotifyStacks } from '@/router/stacks/Notify.stacks'
import { SpaceStacks } from '@/router/SpaceTopTabs'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'
import { useEffect, useRef } from 'react'

const IndexStack = createNativeStackNavigator()

export function IndexStacks() {
  const { refetch } = useBaseNotificationsQuery()

  const timer = useRef<ReturnType<typeof setInterval> | null>()

  useEffect(() => {
    const clear = () => {
      clearInterval(timer.current!)
      timer.current = null
    }

    if (timer.current) {
      clear()
    }

    timer.current = setInterval(refetch, 5000)

    return clear
  })

  return (
    <IndexStack.Navigator screenOptions={{ headerShown: false }}>
      <IndexStack.Screen name={'index'} component={BottomTabs} />
      <IndexStack.Screen name={'hole'} component={HoleNestedStacks} />
      <IndexStack.Screen name={'user-nested'} component={UserStacks} />
      <IndexStack.Screen name={'notify-nested'} component={NotifyStacks} />
      <IndexStack.Screen name={'space-nested'} component={SpaceStacks} />
    </IndexStack.Navigator>
  )
}
