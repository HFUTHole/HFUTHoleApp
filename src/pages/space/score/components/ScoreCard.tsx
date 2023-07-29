import { Card } from '@/components/Card'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import {
  AwardIcon,
  UserIcon,
  UserFriendsIcon,
  FireIcon,
} from '@/components/icon'
import { useAppSelector, useAppDispatch } from '@/store/store'
import { setScoreType, type ScoreType } from '@/store/reducer/spaceScore'
import { useMemo } from 'react'
import { formatScore } from '@/pages/space/@utils/utils'
import type { ScoreInfo } from '@/pages/space/@utils/types'

interface ToggleButton {
  key: ScoreType
  title: string
}

const toggleButtons: ToggleButton[] = [
  { key: 'score', title: '均分' },
  { key: 'gpa', title: 'GPA' },
]

const scoreInfos: ScoreInfo[] = [
  {
    key: 'mine',
    title: '我的成绩',
    Icon: <UserIcon size={16} color="#c1c1c1" />,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: <UserFriendsIcon size={16} color="#c1c1c1" />,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: <FireIcon size={16} color="#c1c1c1" />,
  },
  {
    key: 'max',
    title: '专业最高',
    Icon: <AwardIcon size={16} color="#c1c1c1" />,
  },
]

export const ScoreCard = () => {
  const dispatch = useAppDispatch()
  const { compulsoryRank, totalRank, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const scoreData = useMemo(
    () =>
      formatScore({
        compulsoryRank,
        rankType,
        scoreType,
        totalRank,
      }),
    [compulsoryRank, rankType, scoreType, totalRank]
  )

  return (
    <Card>
      <View className="px-1 py-1">
        <View className="flex flex-row justify-between mb-2">
          <Text className="font-bold text-lg text-gray-300">专业排名</Text>
          {/* TODO 抽离成公共组件 */}
          <View className="flex flex-row">
            {toggleButtons.map((button) => (
              <Pressable
                key={button.key}
                onPress={() => dispatch(setScoreType(button.key))}
                className={`py-1 px-4 rounded-md ${
                  button.key === scoreType ? 'bg-[#4e73f6]' : ''
                }`}
              >
                <Text className="text-white">{button.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text
          variant="headlineMedium"
          className="text-white font-bold"
        >{`${scoreData.rank}/${scoreData.total}`}</Text>

        <View className="flex flex-row justify-between rounded-md mt-2 p-2 bg-[#4e73f6]">
          {scoreInfos.map((info) => (
            <View key={info.key}>
              <Text className="text-gray-200 text-base">{info.title}</Text>
              <View className="flex flex-row mx-auto space-x-1">
                {info.Icon}
                <Text className="text-white">{scoreData[info.key]}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Card>
  )
}
