import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LikeIcon } from '@/components/icon'
import { BottomTabBar } from '@/components/router/bottomTabs'
import { Notify } from '@/pages/notify/Notify'
import { TopTabs } from '@/router/TopTabs'
import { SpaceTopTabs } from '@/router/SpaceTopTabs'
import { User } from '@/pages/user/User'
import { RecommendPost } from '@/pages/home/RecommendPost'
import { store, useAppSelector } from '@/store/store'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

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
  const indexHome = useAppSelector((state) => state.user.helloPage) ?? 'home'

  const [tabs, setTabs] = useImmer([
    {
      name: 'home',
      component: RecommendPost,
    },
    {
      name: 'space',
      component: SpaceTopTabs,
    },
    {
      name: 'notify',
      component: NotifyStacks,
    },
    {
      name: 'user',
      component: User,
    },
  ])

  useEffect(() => {
    setTabs((draft) => {
      const idx = draft.findIndex((item) => item.name === indexHome)
      const item = draft.splice(idx, 1)
      draft.unshift(item[0])
    })
  }, [indexHome])

  return (
    <>
      <Tab.Navigator
        initialRouteName={indexHome}
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          tabBarIcon: () => <LikeIcon size={20} />,
        })}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        {tabs.map((tab) => (
          <Tab.Screen name={tab.name} component={tab.component} />
        ))}
      </Tab.Navigator>
    </>
  )
}
