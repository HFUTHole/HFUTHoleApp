import { useTheme } from 'react-native-paper'
import { StatusBar, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { LogoutIcon } from '@/components/icon'
import { DaySchedule } from '@/pages/space/day-schedule/DaySchedule'
import { WeekSchedule } from '@/pages/space/week-schedule/WeekSchedule'
import { Score } from '@/pages/space/score/Score'
import { ScoreOverview } from '@/pages/space/score/score-overview/ScoreOverview'
import { ScoreInfo } from '@/pages/space/score/score-info/ScoreInfo'
import { FailureRate } from '@/pages/space/score/failure-rate/FailureRate'
import { CustomRanking } from '@/pages/space/score/custom-ranking/CustomRanking'
import { ScoreHelpScreen } from '@/pages/space/service/help/Help'
import { TopTabHeader } from '@/router/components/TopTabHeader'
import { Header } from '@/components/Header'
import { SpaceClassmateScreen } from '@/pages/space/classmate/SpaceClassmateScreen'
import { CourseFailureQuery } from '@/pages/space/course-failure-query/CourseFailureQuery'
import { SpaceLoginScreen } from '@/pages/space/login/SpaceLoginScreen'

const Tab = createMaterialTopTabNavigator()
const SpaceStack = createNativeStackNavigator()
const SpaceAuthStack = createNativeStackNavigator()

const ScoreScreens = [
  {
    name: 'score-overview',
    component: ScoreOverview,
    title: '成绩预览',
  },
  {
    name: 'score-info',
    component: ScoreInfo,
    title: '成绩信息',
  },
  {
    name: 'failure-rate',
    component: FailureRate,
    title: '挂科率查询',
  },
  {
    name: 'custom-ranking',
    component: CustomRanking,
    title: '自定义排名',
  },
  {
    name: 'help',
    component: ScoreHelpScreen,
    title: '成绩帮助',
  },
  {
    name: 'classmate',
    component: SpaceClassmateScreen,
    title: '同班同学',
  },
  {
    name: 'course-failure-query',
    component: CourseFailureQuery,
    title: '课程挂科率查询',
  },
]

export const SpaceStacks = () => {
  return (
    <>
      <StatusBar backgroundColor={'white'} />
      <SpaceStack.Navigator screenOptions={{ header: Header }}>
        {ScoreScreens.map((screen) => (
          <SpaceStack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{ title: screen.title }}
          />
        ))}
      </SpaceStack.Navigator>
    </>
  )
}

const TabScreens = [
  { name: 'day', component: DaySchedule, title: '日程' },
  { name: 'week', component: WeekSchedule, title: '课表' },
  { name: 'score', component: Score, title: '成绩' },
]

export const SpaceTopTabs = () => {
  const theme = useTheme()

  const { isLogin, logout } = useAuth()

  return (
    <>
      {isLogin ? (
        <>
          <StatusBar backgroundColor={theme.colors.background} />
          <Tab.Navigator
            initialRouteName={'day'}
            tabBar={(props) => (
              <TopTabHeader {...props} onRightPress={logout}>
                <LogoutIcon />
              </TopTabHeader>
            )}
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
      ) : (
        <SpaceAuthStack.Navigator screenOptions={{ headerShown: false }}>
          <SpaceAuthStack.Screen name={'login'} component={SpaceLoginScreen} />
        </SpaceAuthStack.Navigator>
      )}
    </>
  )
}
