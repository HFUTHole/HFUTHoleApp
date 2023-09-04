import { useCallback } from 'react'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { formatScore } from '@/pages/space/@utils/utils'
import { ScoreScrollWrapper } from '@/pages/space/components/ScoreScrollWrapper'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  UserFriendsIcon,
  FireIcon,
  ChartBar,
} from '@/components/icon'
import type { ScoreInfo as ScoreInfoItem } from '@/pages/space/@utils/types'

export type SemesterInfo = Omit<Semester, 'compulsoryRank' | 'totalRank'> & {
  scoreData: ReturnType<typeof formatScore>
}

const scoreInfos: ScoreInfoItem[] = [
  {
    key: 'rank',
    title: '我的排名',
    Icon: <ChartBar size={16} />,
  },
  {
    key: 'mine',
    title: '我的成绩',
    Icon: <UserIcon size={16} />,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: <UserFriendsIcon size={16} />,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: <FireIcon size={16} />,
  },
]

export const ScoreOverviewPage = ({
  scoreData,
  scores,
  semester,
  semesterId,
}: SemesterInfo) => {
  const { navigate } = useNavigation()
  const goToScoreInfo = useCallback(
    (params: SingleScoreDto) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigate('space-nested', {
        screen: 'score-info',
        params,
      })
    },
    [navigate]
  )

  return (
    <ScoreScrollWrapper>
      <View className={'px-2 pt-4 pb-8 min-h-screen'}>
        <View className="rounded-lg bg-white p-4">
          <Text className="mx-auto font-bold" variant="titleLarge">
            {semester}
          </Text>

          <View className="flex flex-row justify-between rounded-md mt-4 p-2 bg-[#F5F6F9]">
            {scoreInfos.map((info) => (
              <View key={info.key}>
                <Text className="text-black/50">{info.title}</Text>
                <View className="flex flex-row mx-auto space-x-1">
                  {info.Icon}
                  <Text>
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
              <Pressable
                key={score.name}
                className="flex flex-row justify-between space-x-4"
                onPress={() =>
                  goToScoreInfo({ lessonId: score.lessonId, semesterId })
                }
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
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScoreScrollWrapper>
  )
}
