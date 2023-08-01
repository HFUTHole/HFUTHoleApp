import { Card } from '@/pages/space/components/Card'
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
import {
  ToggleButton,
  ButtonOptions,
} from '@/pages/space/score/components/ToggleButton'
import type { ScoreInfo } from '@/pages/space/@utils/types'

const buttonOptions: ButtonOptions<'score' | 'gpa'>[] = [
  { key: 'score', title: '均分' },
  { key: 'gpa', title: 'GPA' },
]

const scoreInfos: ScoreInfo[] = [
  {
    key: 'mine',
    title: '我的成绩',
    Icon: UserIcon,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: UserFriendsIcon,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: FireIcon,
  },
  {
    key: 'max',
    title: '专业最高',
    Icon: AwardIcon,
  },
]

export const ScoreCard = () => {
  const dispatch = useAppDispatch()
  const { compulsoryRank, totalRank, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const scoreData = useMemo(
    () => formatScore({ compulsoryRank, totalRank }, rankType, scoreType),
    [compulsoryRank, rankType, scoreType, totalRank]
  )

  return (
    <Card>
      <View className="px-1 py-1 space-y-2">
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-white/70">专业排名</Text>
          <ToggleButton
            buttonOptions={buttonOptions}
            currentKey={scoreType}
            onChange={(key) => dispatch(setScoreType(key))}
          />
        </View>

        <Text className="text-white text-2xl">{`${scoreData.rank}/${scoreData.total}`}</Text>

        <View
          className="flex flex-row justify-between rounded-md mt-2 px-4 py-2"
          style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }}
        >
          {scoreInfos.map((info) => (
            <View key={info.key}>
              <Text className="text-white/80 text-xs">{info.title}</Text>
              <View className="flex flex-row mx-auto space-x-1 items-center">
                <info.Icon size={12} color={'#fff'} style={{ opacity: 0.8 }} />
                <Text className="text-white/80 text-sm">
                  {scoreData[info.key].toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Card>
  )
}
