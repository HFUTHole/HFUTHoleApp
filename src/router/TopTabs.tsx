import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HolePost } from '@/pages/hole/post/post'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import { HoleSearch } from '@/pages/hole/search/search'
import { HoleSearchResult } from '@/pages/hole/search/result/result'
import { HoleDetail } from '@/pages/hole/detail/detail'
import { HoleReply } from '@/pages/hole/detail/reply/HoleReply'
import { HoleHot } from '@/pages/hole/hot/HoleHot'
import { StatusBar, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'
import { HoleCategoryScreen } from '@/pages/hole/category/HoleCategoryScreen'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'
import { SearchIcon } from '@/components/icon'
import { TopTabHeader } from '@/router/components/TabHeader'
import { Categories } from '@/pages/hole/Category'
import { useHoleCategoryRoute } from '@/shared/hooks/route/useHoleCategoryRoute'
import { HoleMain } from '@/pages/hole/main/HoleMain'
import { HoleModeTabs } from './ModeTabs'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'

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
      initialRouteName={'category'}
      tabBar={(props) => {
        return <TopTabHeader {...props} />
      }}
    >
      {Categories.map((category) => (
        <Tab.Screen
          key={category.name}
          name={category.name}
          component={HoleCategoryScreen}
        />
      ))}
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
        <HoleStack.Screen name={'mode'} component={HoleModeTabs} />
        <HoleStack.Screen name={'category'} component={HoleCategoryTabs} />
      </HoleStack.Navigator>
    </HoleDetailCommentContextProvider>
  )
}

export function TopTabs() {
  const theme = useTheme()
  const { go } = useHoleCategoryRoute()

  const route = useHoleSearchRoute()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <Tab.Navigator
        initialRouteName={'main'}
        tabBar={(props) => (
          <TopTabHeader {...props} onRightPress={route.goIndex} />
        )}
        screenOptions={{
          tabBarScrollEnabled: true,
          swipeEnabled: true,
          lazy: true,
          lazyPreloadDistance: 0,
        }}
      >
        <Tab.Screen
          name={'main'}
          component={HoleMain}
          options={{ title: '主页' }}
        />
        {Categories.map((category) => (
          // Boards
          <Tab.Screen
            key={category.name}
            name={category.name}
            options={{ title: category.name }}
          >
            {(props) => <HoleModeTabs {...props} category={category.name} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </>
  )
}
