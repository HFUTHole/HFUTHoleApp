import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabs, UserStacks } from '@/router/BottomTabs'
import { HoleNestedStacks } from '@/router/TopTabs'
import { NotifyStacks } from '@/router/stacks/Notify.stacks'
import { SpaceStacks } from '@/router/SpaceTopTabs'

const IndexStack = createNativeStackNavigator()

export function IndexStacks() {
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
