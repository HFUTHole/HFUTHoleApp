import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HoleModeTabs } from './ModeTabs'
import { ArticleCategoryEnum } from '@/shared/enums'
import { SubCategoryTabHeader } from './components/TabHeader'

const HoleSubCategoryTab = createMaterialTopTabNavigator()

export const HoleSubCategoryTabs = (props: { category: any }) => {
  const category = props.category

  return (
    <HoleSubCategoryTab.Navigator
      initialRouteName={'latest'}
      tabBar={(props) => (
        <SubCategoryTabHeader categoryColors={category.color} {...props} />
      )}
      screenOptions={{
        tabBarScrollEnabled: true,
        swipeEnabled: true,
        lazy: true,
        lazyPreloadDistance: 0,
      }}
    >
      <HoleSubCategoryTab.Screen
        key={category.name}
        name={category.name}
        options={{
          title: '全部',
        }}
      >
        {(props) => (
          <HoleModeTabs {...props} category={category} subcategory={''} />
        )}
      </HoleSubCategoryTab.Screen>
      {category.children &&
        category.children.map((subcategory) => (
          <HoleSubCategoryTab.Screen
            key={subcategory}
            name={subcategory}
            options={{
              title: subcategory,
            }}
          >
            {(props) => (
              <HoleModeTabs
                {...props}
                category={category}
                subcategory={subcategory}
              />
            )}
          </HoleSubCategoryTab.Screen>
        ))}
    </HoleSubCategoryTab.Navigator>
  )
}
