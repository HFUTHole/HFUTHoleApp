import { useScheduleVisibleWeek } from '@/pages/space/@utils/useScheduleVisibleWeek'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { useDaySchedule } from '@/pages/space/day-schedule/useDaySchedule'
import { Text } from 'react-native-paper'
import { View, Pressable } from 'react-native'
import { useAppDispatch } from '@/store/store'
import { setDaySchedule } from '@/store/reducer/spaceCourse'
import { useCallback } from 'react'
import { WeekChange } from '@/pages/space/components/WeekChange'
import { ScheduleVisibleWeek } from '@/pages/space/@utils/types'

export const Header = () => {
  const { visibleDate, daySchedule, todaySchedule } = useDaySchedule()
  const dayScheduleVisibleWeek = useScheduleVisibleWeek('daySchedule')
  const dispatch = useAppDispatch()

  const handleActiveChange = useCallback(
    (index: number) => {
      dispatch(setDaySchedule({ ...daySchedule, dayIdx: index }))
    },
    [dispatch, daySchedule],
  )

  return (
    <View className="px-4">
      <Text variant="headlineSmall" className="font-bold">
        {visibleDate}
      </Text>

      <Text className="text-[#9499AA]">
        你今天有 <Text className="text-[#4981F9]">{todaySchedule.length}</Text>{' '}
        项安排
      </Text>

      <WeekChange
        scheduleKey="daySchedule"
        text={`第${daySchedule.weekIdx + 1}周`}
      />

      <View className="flex flex-row mt-2 gap-2">
        {dayScheduleVisibleWeek.map((visibleDate, index) => (
          <Pressable
            key={index}
            className="flex-1"
            onPress={() => handleActiveChange(index)}
          >
            <VisibleWeekItem {...visibleDate} />
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const VisibleWeekItem = ({ active, day, weekday }: ScheduleVisibleWeek) => {
  const color = useDerivedValue(() => (active ? '#fff' : '#94a3b8'), [active])
  const backgroundColor = useDerivedValue(
    () => (active ? '#4981F9' : '#EDEFF3'),
    [active],
  )

  const boxStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value),
    }
  })
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(color.value),
    }
  })

  return (
    <Animated.View
      className={`rounded-md bg-[#EDEFF3] py-3 ${active ? 'bg-[#4981F9]' : ''}`}
      style={boxStyle}
    >
      <Animated.Text
        className={`mx-auto text-slate-400 ${active ? 'text-white' : ''}`}
        style={textStyle}
      >
        {weekday}
      </Animated.Text>
      <Animated.Text
        className={`mx-auto text-slate-400 ${active ? 'text-white' : ''}`}
        style={textStyle}
      >
        {day}
      </Animated.Text>
    </Animated.View>
  )
}
