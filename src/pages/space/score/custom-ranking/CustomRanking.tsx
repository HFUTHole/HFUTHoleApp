import type { ScoreType } from '@/store/reducer/spaceScore'
import type { ButtonOptions } from '@/components/button/ToggleButton'
import type { CardScoreData } from '@/pages/space/@utils/types'
import { FlatList, View } from 'react-native'
import { ScreenWrapper } from '@/components/ScrollWrapper'
import { useAppSelector } from '@/store/store'
import { ScoreCard } from '@/pages/space/score/components/ScoreCard'
import { useMemo, useState } from 'react'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import { useImmer } from 'use-immer'
import { Checkbox } from './Checkbox'
import { useDebounceFn } from 'ahooks'
import { getCustomScoreRankRequest } from '@/request/space/score'
import { useMutation } from 'react-query'
import { SearchIcon } from '@/components/icon'
import { IconButton } from '@/components/IconButton'

const buttonOptions: ButtonOptions<ScoreType>[] = [
  { key: 'score', title: '均分' },
  { key: 'gpa', title: 'GPA' },
]

export const CustomRanking = () => {
  const theme = useTheme()
  const [scoreType, setScoreType] = useState<ScoreType>('score')
  const semesters = useAppSelector((state) => state.spaceScore.semesters)
  const [checkedState, setCheckState] = useImmer<boolean[][]>(() =>
    semesters.map((semester) =>
      semester.scores.map((score) => {
        if (score.lessonId.endsWith('B') || score.lessonId.endsWith('0X')) {
          return true
        } else {
          return false
        }
      }),
    ),
  )

  const checkboxGroupChecked = useMemo(
    () => checkedState.map((group) => group.every((item) => item)),
    [checkedState],
  )

  const mutation = useMutation({
    retry: false,
    mutationFn: (selectedCourse: string[]) =>
      getCustomScoreRankRequest(selectedCourse),
  })

  const scoreData = useMemo<CardScoreData>(() => {
    const res = mutation.data
    if (!res) {
      return {
        actualNum: 0,
        avg: 0,
        head: 0,
        max: 0,
        mine: 0,
        rank: 0,
        total: 0,
      }
    }
    return {
      ...res[scoreType],
      total: res.total,
    }
  }, [mutation.data, scoreType])

  const { run: handleQueryClick } = useDebounceFn(
    () => {
      const selectCourse: string[] = []
      semesters.forEach((semester, semesterIndex) => {
        semester.scores.forEach((score, scoreIndex) => {
          if (checkedState[semesterIndex][scoreIndex]) {
            selectCourse.push(score.name)
          }
        })
      })
      mutation.mutate(selectCourse)
    },
    { wait: 300 },
  )

  const handleScoreTypeChange = (key: ScoreType) => setScoreType(key)

  const handleClick = (semesterIndex: number, scoreIndex: number) => {
    setCheckState((draft) => {
      draft[semesterIndex][scoreIndex] = !draft[semesterIndex][scoreIndex]
    })
  }

  const handleCheckboxGroupChange = (semesterIndex: number) => {
    const checked = !checkedState[semesterIndex].every((item) => item)
    setCheckState((draft) => {
      const groupChecked = Array(draft[semesterIndex].length).fill(checked)
      draft[semesterIndex] = groupChecked
    })
  }

  return (
    <View className="w-full h-[100%] p-3 space-y-2 relative">
      <View className="absolute w-14 h-12 right-0 top-[5%] z-[10] rounded-full">
        <IconButton
          containerColor={theme.colors.primary}
          onPress={handleQueryClick}
          icon={() => <SearchIcon color="white" size={20} />}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            right: 2,
            top: 200,
            zIndex: 10,
            borderRadius: 9999,
          }}
          loading={mutation.isLoading}
        />
      </View>
      <ScoreCard
        title="自定义排名"
        scoreButtonOptions={buttonOptions}
        scoreData={scoreData}
        scoreType={scoreType}
        onScoreTypeChange={handleScoreTypeChange}
      />
      <FlatList
        data={semesters}
        renderItem={({ item: semester, index: semesterIndex }) => {
          return (
            <View
              key={semester.semesterId}
              className="p-4 bg-white rounded-lg mt-2"
            >
              <View className="flex flex-row justify-between p-2 border-b border-gray-200">
                <Text variant="titleMedium">{semester.semester}</Text>
                <Checkbox
                  checked={checkboxGroupChecked[semesterIndex]}
                  onChange={() => handleCheckboxGroupChange(semesterIndex)}
                />
              </View>
              <View className="space-y-1">
                {semester.scores.map((item, scoreIndex) => (
                  <TouchableRipple
                    onPress={() => handleClick(semesterIndex, scoreIndex)}
                    key={item.lessonId}
                    className="w-full"
                  >
                    <View className="w-full flex flex-row justify-between p-2 items-center">
                      <Text className="flex-1 mr-8">{item.name}</Text>
                      <Checkbox
                        checked={checkedState[semesterIndex][scoreIndex]}
                        onChange={() => handleClick(semesterIndex, scoreIndex)}
                      />
                    </View>
                  </TouchableRipple>
                ))}
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}
