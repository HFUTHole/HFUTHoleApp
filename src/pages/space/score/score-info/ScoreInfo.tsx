import { useCallback, useMemo } from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { Page } from '@/pages/space/components/Page'
import { useAppSelector } from '@/store/store'
import { formatScore } from '@/pages/space/@utils/utils'
import { TabView, type Tab } from '@/components/TabView'
import { ScoreScrollWrapper } from '@/pages/space/components/ScoreScrollWrapper'
import { Empty } from '@/components/image/Empty'
import {
  UserIcon,
  UserFriendsIcon,
  FireIcon,
  ChartBar,
} from '@/components/icon'
import type { Route } from 'react-native-tab-view'
import type { ScoreInfo as ScoreInfoItem } from '@/pages/space/@utils/types'

type SemesterInfo = Omit<
  Semester,
  'compulsoryRank' | 'totalRank' | 'semesterId'
> & { scoreData: ReturnType<typeof formatScore> }

const scoreInfos: ScoreInfoItem[] = [
  {
    key: 'rank',
    title: '我的排名',
    Icon: <ChartBar size={16} color="#4B5563" />,
  },
  {
    key: 'mine',
    title: '我的成绩',
    Icon: <UserIcon size={16} color="#4B5563" />,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: <UserFriendsIcon size={16} color="#4B5563" />,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: <FireIcon size={16} color="#4B5563" />,
  },
]

const ScoreInfoPage = ({ scoreData, scores, semester }: SemesterInfo) => {
  return (
    <Page>
      <ScoreScrollWrapper>
        <View className="py-6 px-3 my-6 rounded-xl bg-white">
          <Text className="mx-auto font-bold" variant="titleLarge">
            {semester}
          </Text>

          <View className="flex flex-row justify-between rounded-md mt-4 p-2 bg-[#F5F6F9]">
            {scoreInfos.map((info) => (
              <View key={info.key}>
                <Text className="text-gray-400 text-base">{info.title}</Text>
                <View className="flex flex-row mx-auto space-x-1">
                  {info.Icon}
                  <Text className="text-gray-600">
                    {info.key === 'rank'
                      ? `${scoreData.rank}/${scoreData.total}`
                      : scoreData[info.key]}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="mt-4 flex space-y-4">
            {scores.map((score) => (
              <View
                key={score.name}
                className="flex flex-row justify-between space-x-4"
              >
                <View className="flex flex-1 flex-row space-x-1">
                  <View
                    className={`h-4 w-1 mt-1 rounded-sm ${
                      parseInt(score.score) < 60
                        ? 'bg-red-500'
                        : parseInt(score.score) > 60 &&
                          parseInt(score.score) < 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <View className="space-y-2">
                    <Text variant="titleMedium">{score.name}</Text>
                    <View className="flex flex-row space-x-2">
                      <Text className="text-gray-500 text-xs">
                        {`学分：${score.credit}`}
                      </Text>
                      <Text className="text-gray-500 text-xs">{`GPA：${score.gpa}`}</Text>
                    </View>
                  </View>
                </View>
                <Text variant="titleMedium" className="mr-4">
                  {score.gpa === null ? '待评教' : score.score}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScoreScrollWrapper>
    </Page>
  )
}

export const ScoreInfo = () => {
  const { semesters, rankType } = useAppSelector((state) => state.spaceScore)

  const semestersInfo = useMemo(
    () =>
      semesters.map<SemesterInfo>((item) => ({
        semester: item.semester,
        scores: item.scores,
        scoreData: formatScore({
          compulsoryRank: item.compulsoryRank,
          totalRank: item.totalRank,
          rankType,
          scoreType: 'score',
        }),
      })),
    [rankType, semesters]
  )

  const tabs = useMemo(
    () =>
      semestersInfo.map<Tab>((semester) => ({
        key: semester.semester,
      })),
    [semestersInfo]
  )

  const renderScene = useCallback(
    ({ route }: { route: Route }) => {
      const semester = semestersInfo.find(
        (item) => item.semester === route.key
      )!
      return <ScoreInfoPage {...semester} />
    },
    [semestersInfo]
  )

  return (
    <View className="flex-1">
      {tabs.length ? (
        <TabView
          tabs={tabs}
          renderScene={renderScene}
          renderTabBar={() => <View />}
        />
      ) : (
        <Empty text="数据似乎飞走了" />
      )}
    </View>
  )
}
