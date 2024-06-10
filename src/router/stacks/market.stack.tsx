import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import React from 'react'
import { Header } from '@/components/Header'
import { useParams } from '@/shared/hooks/useParams'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MarketScreen } from '@/pages/market/MarketScreen'
import { MarketFavoriteScreen } from '@/pages/market/MarketFavoriteScreen'
import { UsedGoodsDetailScreen } from '@/pages/market/detail/UsedGoodsDetailScreen'

const MarketStack = createNativeStackNavigator()

export type Screen = {
  name: string
  component: React.FunctionComponent
  options?: NativeStackNavigationOptions
}

const MarketScreens: Screen[] = [
  {
    name: 'market-index',
    component: MarketScreen,
    options: {
      title: '淘二手',
    },
  },
  {
    name: 'market-favorite',
    component: MarketFavoriteScreen,
    options: {
      title: '我的收藏',
    },
  },
  {
    name: 'detail',
    component: UsedGoodsDetailScreen,
    options: {
      headerShown: false,
    },
  },
]

const excludeSafeAreaScreens: string[] = []

export const MarketStacks = () => {
  const { screen } = useParams<{ screen: string }>()

  return (
    <MarketStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {MarketScreens.map((screen) => (
        <MarketStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </MarketStack.Navigator>
  )
}
