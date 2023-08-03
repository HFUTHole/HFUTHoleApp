import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HolePost } from '@/pages/hole/post/post'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import { HoleSearch } from '@/pages/hole/search/search'
import { HoleSearchResult } from '@/pages/hole/search/result/result'
import { HoleDetail } from '@/pages/hole/detail/detail'
import { HoleReply } from '@/pages/hole/detail/reply/HoleReply'
import { HoleHot } from '@/pages/hole/hot/HoleHot'
import { TopTabBar } from '@/components/router/TopTabBar'
import { HoleLatest } from '@/pages/hole/latest/HoleLatest'
import { StatusBar, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'
import { HoleCategoryScreen } from '@/pages/hole/category/HoleCategoryScreen'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'
import { SearchIcon } from '@/components/icon'
import { TopTabHeader } from '@/router/components/TopTabHeader'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { HoleLatestNew } from '@/pages/hole/latest/HoleLatestNew'

const Tab = createMaterialTopTabNavigator()
const HoleStack = createNativeStackNavigator()
const HoleCategoryTab = createMaterialTopTabNavigator()

const HoleSearchStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        header: () => <HoleSearchHeader />,
      }}
    >
      <HoleStack.Screen name={'index'} component={HoleSearch} />
      <HoleStack.Screen name={'result'} component={HoleSearchResult} />
    </HoleStack.Navigator>
  )
}

const HoleDetailStacks = () => {
  return (
    <HoleStack.Navigator
      initialRouteName={'index'}
      screenOptions={{ header: () => <HoleDetailHeader /> }}
    >
      <HoleStack.Screen name={'index'} component={HoleDetail} />
      <HoleStack.Screen name={'reply'} component={HoleReply} />
    </HoleStack.Navigator>
  )
}

const HoleCategoryTabs = () => {
  return (
    <HoleCategoryTab.Navigator
      initialRouteName={'index'}
      tabBar={(props) => <TopTabHeader {...props} />}
    >
      <HoleCategoryTab.Screen
        name={'latest'}
        component={HoleCategoryScreen}
        options={{ title: '最新' }}
      />
      <HoleCategoryTab.Screen
        name={'hot'}
        component={() => <HoleCategoryScreen />}
        options={{ title: '热门' }}
      />
    </HoleCategoryTab.Navigator>
  )
}

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
        <HoleStack.Screen name={'category'} component={HoleCategoryTabs} />
      </HoleStack.Navigator>
    </HoleDetailCommentContextProvider>
  )
}

const TabScreens = [
  { name: 'latest', component: HoleLatestNew, title: '最新' },
  { name: 'hot', component: HoleHot, title: '热门' },
]

export function TopTabs() {
  const theme = useTheme()

  const route = useHoleSearchRoute()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <Tab.Navigator
        initialRouteName={'latest'}
        tabBar={(props) => (
          <TopTabHeader {...props} onRightPress={route.goIndex}>
            <SearchIcon />
          </TopTabHeader>
        )}
      >
        {TabScreens.map((item) => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{ title: item.title }}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}
