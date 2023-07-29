import { useTheme } from 'react-native-paper'
import { StatusBar, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TopTabBar } from '@/components/router/TopTabBar'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { IconButton } from '@/components/IconButton'
import { LogoutIcon } from '@/components/icon'
import { DaySchedule } from '@/pages/space/day-schedule/DaySchedule'
import { WeekSchedule } from '@/pages/space/week-schedule/WeekSchedule'
import { Score } from '@/pages/space/score/Score'
import { ScoreOverview } from '@/pages/space/score/score-overview/ScoreOverview'
import { ScoreInfo } from '@/pages/space/score/score-info/ScoreInfo'
import { FailureRate } from '@/pages/space/score/failure-rate/FailureRate'
import { CustomRanking } from '@/pages/space/score/custom-ranking/CustomRanking'
import { Help } from '@/pages/space/service/help/Help'

const Tab = createMaterialTopTabNavigator()
const SpaceStack = createNativeStackNavigator()

export const SpaceStacks = () => {
  return (
    <SpaceStack.Navigator screenOptions={{ headerShown: false }}>
      <SpaceStack.Screen name="score-overview" component={ScoreOverview} />
      <SpaceStack.Screen name="failure-rate" component={FailureRate} />
      <SpaceStack.Screen name="custom-ranking" component={CustomRanking} />
      <SpaceStack.Screen name="score-info" component={ScoreInfo} />
      <SpaceStack.Screen name="help" component={Help} />
    </SpaceStack.Navigator>
  )
}

const TabScreens = [
  { name: 'day', component: DaySchedule, title: '日程' },
  { name: 'week', component: WeekSchedule, title: '课表' },
  { name: 'score', component: Score, title: '成绩' },
]

export const SpaceTopTabs = () => {
  const theme = useTheme()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <Tab.Navigator
        initialRouteName={'day'}
        tabBar={(props) => <TopBar {...props} />}
        screenOptions={{
          swipeEnabled: false,
        }}
      >
        {TabScreens.map((item) => (
          <Tab.Screen
            name={item.name}
            component={item.component}
            options={{ title: item.title }}
            key={item.name}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}

const TopBar = (props: MaterialTopTabBarProps) => {
  const { isLogin, logout } = useAuth()

  return (
    <>
      {isLogin ? (
        <View className="flex flex-row justify-between items-center">
          <TopTabBar {...props} />
          <IconButton
            icon={() => <LogoutIcon size={20} />}
            transparent
            onPress={logout}
          />
        </View>
      ) : null}
    </>
  )
}
