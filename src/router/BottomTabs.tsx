import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LikeIcon } from '@/components/icon'
import { BottomTabBar } from '@/components/router/bottomTabs'
import { Notify } from '@/pages/notify/Notify'
import { TopTabs } from '@/router/TopTabs'
import { SpaceTopTabs } from '@/router/SpaceTopTabs'
import { User } from '@/pages/user/User'
import { RecommendPost } from '@/pages/home/RecommendPost'

const Tab = createBottomTabNavigator()
const NotifyStack = createNativeStackNavigator()

const NotifyStacks = () => {
  return (
    <NotifyStack.Navigator screenOptions={{ headerShown: false }}>
      <NotifyStack.Screen name={'index'} component={Notify} />
    </NotifyStack.Navigator>
  )
}

export function BottomTabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          tabBarIcon: () => <LikeIcon size={20} />,
        })}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <Tab.Screen name={'home'} component={RecommendPost} />
        <Tab.Screen name={'space'} component={SpaceTopTabs} />
        <Tab.Screen name={'notify'} component={NotifyStacks} />
        <Tab.Screen name={'user'} component={User} />
      </Tab.Navigator>
    </>
  )
}
