import { HoleCategoryScreen } from '@/pages/hole/category/HoleCategoryScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ModeTabHeader, TopTabHeader } from './components/TabHeader'
import { ArticleCategoryEnum } from '@/shared/enums'

const HoleModeTab = createMaterialTopTabNavigator()

export const HoleModeTabs = (props: { category: any; subcategory: string }) => {
  const category = props.category
  const subcategory = props.subcategory

  return (
    <HoleModeTab.Navigator
      initialRouteName={'latest'}
      tabBar={(props) => <ModeTabHeader {...props} />}
      screenOptions={{
        tabBarScrollEnabled: false,
        swipeEnabled: true,
        lazy: true,
        lazyPreloadDistance: 0,
      }}
    >
      <HoleModeTab.Screen name={'latest'} options={{ title: '最新' }}>
        {(props) => (
          <HoleCategoryScreen
            {...props}
            category={category}
            subcategory={subcategory}
          />
        )}
      </HoleModeTab.Screen>
      <HoleModeTab.Screen name={'hot'} options={{ title: '热门' }}>
        {(props) => (
          <HoleCategoryScreen
            {...props}
            category={category}
            subcategory={subcategory}
          />
        )}
      </HoleModeTab.Screen>
    </HoleModeTab.Navigator>
  )
}
