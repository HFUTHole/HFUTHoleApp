import { HoleCategoryScreen } from '@/pages/hole/category/HoleCategoryScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ModeTabHeader, TopTabHeader } from './components/TabHeader'

const HoleModeTab = createMaterialTopTabNavigator()

export const HoleModeTabs = (props: { category: any }) => {
  const category = props.category
  return (
    <HoleModeTab.Navigator
      initialRouteName={'latest'}
      tabBar={(props) => <ModeTabHeader {...props} />}
      screenOptions={{
        tabBarScrollEnabled: false,
        swipeEnabled: false,
        lazy: true,
        lazyPreloadDistance: 0,
      }}
    >
      <HoleModeTab.Screen name={'latest'} options={{ title: '最新' }}>
        {(props) => <HoleCategoryScreen {...props} category={category} />}
      </HoleModeTab.Screen>
      <HoleModeTab.Screen name={'hot'} options={{ title: '热门' }}>
        {(props) => <HoleCategoryScreen {...props} category={category} />}
      </HoleModeTab.Screen>
    </HoleModeTab.Navigator>
  )
}
