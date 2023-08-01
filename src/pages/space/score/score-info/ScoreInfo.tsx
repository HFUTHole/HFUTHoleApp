import { View } from 'react-native'
import { useParams } from '@/shared/hooks/useParams'
import { useSpaceSingleScore } from '@/swr/space/score'
import { useAppSelector } from '@/store/store'
import { ScreenWrapper } from '@/components/ScrollWrapper'
import { Text } from 'react-native-paper'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useCallback, useMemo, useState } from 'react'
import { formatScore } from '@/pages/space/@utils/utils'
import { objectMap, floatFixed } from '@/shared/utils/utils'
import { Card } from '@/pages/space/components/Card'
import { ScoreDetail } from '@/pages/space/score/score-info/ScoreDetail'
import { UserIcon, UserFriendsIcon, FireIcon } from '@/components/icon'
import {
  ToggleButton,
  type ButtonOptions,
} from '@/pages/space/score/components/ToggleButton'
import type { ScoreInfo as ScoreInfoItem } from '@/pages/space/@utils/types'

type ScoreType = 'score' | 'gpa'
type RankType = 'majorRank' | 'classRank' | 'schoolRank'

const scoreButtonOptions: ButtonOptions<ScoreType>[] = [
  { key: 'score', title: '均分' },
  { key: 'gpa', title: 'GPA' },
]

const rankButtonOptions: ButtonOptions<RankType>[] = [
  {
    key: 'majorRank',
    title: '专业排名',
  },
  {
    key: 'classRank',
    title: '教学班排名',
  },
  {
    key: 'schoolRank',
    title: '全校排名',
  },
]

const rankTitleMap: Record<RankType, string> = {
  majorRank: '专业',
  classRank: '教学班',
  schoolRank: '全校',
}

export const ScoreInfo = () => {
  const [rankType, setRankType] = useState<RankType>('majorRank')
  const [scoreType, setScoreType] = useState<ScoreType>('score')
  const params = useParams<SingleScoreDto>()
  const { data, isFetching, isLoading, isError, refetch } =
    useSpaceSingleScore()
  const { semesters } = useAppSelector((state) => state.spaceScore)

  const courseName = useMemo(
    () =>
      semesters
        .find((semester) => semester.semesterId === params.semesterId)!
        .scores.find((item) => item.lessonId === params.lessonId)!.name,
    [params, semesters]
  )

  const scoreData = useMemo(() => {
    if (!data) {
      return
    }
    return formatScore(data, rankType, scoreType)
  }, [data, rankType, scoreType])!

  const details = useMemo(() => {
    return data?.[rankType].details.map(
      (item) =>
        objectMap(item, (value) => {
          if (typeof value === 'string' || !value.toString().includes('.')) {
            return value
          } else {
            return floatFixed(value)
          }
        }) as SingleScoreDetail
    )
  }, [data, rankType])!

  const rankInfos = useMemo<ScoreInfoItem[]>(
    () => [
      {
        key: 'mine',
        title: '我的成绩',
        Icon: UserIcon,
      },
      {
        key: 'avg',
        title: `${rankTitleMap[rankType]}平均`,
        Icon: UserFriendsIcon,
      },
      {
        key: 'head',
        title: `${rankTitleMap[rankType]}前10%`,
        Icon: FireIcon,
      },
      {
        key: 'max',
        title: `${rankTitleMap[rankType]}最高`,
        Icon: FireIcon,
      },
    ],
    [rankType]
  )

  const handleScoreTypeChange = useCallback(
    (key: ScoreType) => setScoreType(key),
    []
  )
  const handleRankTypeChange = useCallback(
    (key: RankType) => setRankType(key),
    []
  )

  return (
    <LoadingScreen
      isLoading={isLoading}
      isError={isError}
      displayOriginalPageOnError={true}
    >
      <View className={'px-3 min-h-screen bg-background'}>
        <ScreenWrapper
          contentContainerStyle={{
            minHeight: '100%',
          }}
          refreshControl={
            <RefreshIndicatorControl
              refreshing={isFetching}
              onRefresh={refetch}
            />
          }
        >
          {data ? (
            <View className="mt-5">
              <Card>
                <View className="px-1 py-1 space-y-2">
                  <View className="flex flex-row justify-between">
                    <Text className="font-bold text-gray-300">
                      {courseName}
                    </Text>
                    <ToggleButton
                      buttonOptions={scoreButtonOptions}
                      currentKey={scoreType}
                      onChange={handleScoreTypeChange}
                    />
                  </View>

                  <Text className="text-white text-2xl">{`${scoreData.rank}/${scoreData.total}`}</Text>

                  <View>
                    <ToggleButton
                      style={{ justifyContent: 'space-between' }}
                      buttonOptions={rankButtonOptions}
                      currentKey={rankType}
                      onChange={handleRankTypeChange}
                    />
                  </View>

                  <View className="flex flex-row justify-between rounded-md p-2 bg-white/20">
                    {rankInfos.map((info) => (
                      <View
                        key={info.key}
                        className={'justify-center items-center'}
                      >
                        <Text className="text-white/80 text-xs">
                          {info.title}
                        </Text>
                        <View className="flex flex-row mx-auto space-x-1 self-start">
                          <View>
                            <info.Icon size={12} color={'#ffffff'} />
                          </View>
                          <Text className="text-white text-xs">
                            {scoreData[info.key].toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </Card>
              <ScoreDetail details={details} />
            </View>
          ) : null}
        </ScreenWrapper>
      </View>
    </LoadingScreen>
  )
}
