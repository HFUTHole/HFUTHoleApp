import type { Colors, CourseSchedule } from '@/pages/space/@utils/types'
import { useWeekSchedule } from '@/pages/space/week-schedule/useWeekSchedule'
import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'
import {
  generateCardStyle,
  formatRoom,
  formatCourseName,
  getLongestSchedule,
} from '@/pages/space/@utils/utils'
import { useMemo, useRef } from 'react'
import { ScheduleSheet } from '@/pages/space/components/ScheduleSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

interface CardProps {
  schedules: CourseSchedule[]
}

export const CourseList = () => {
  const { weekLayout } = useWeekSchedule()

  return (
    <View className="w-full flex flex-row">
      {weekLayout.map((dayLayout, dayLayoutIndex) => (
        <View key={dayLayoutIndex} className="flex-1">
          {dayLayout.map(({ layoutIndex, schedules, style }) => (
            <View
              className="w-full px-[2px] h-[62px] border-slate-200 "
              key={layoutIndex}
              style={style}
            >
              <Card schedules={schedules} />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

const Card = ({ schedules }: CardProps) => {
  const sheetRef = useRef<BottomSheetModal>(null)

  const { length } = schedules

  if (length === 0) {
    return null
  }

  if (length > 1) {
    return <ConflictCard schedules={schedules} />
  }

  return (
    <Pressable onPress={sheetRef.current?.present}>
      <ScheduleCard schedule={schedules[0]} />
      <ScheduleSheet ref={sheetRef} schedule={schedules[0]} />
    </Pressable>
  )
}

const ConflictCard = ({ schedules }: CardProps) => {
  const scheduleLongest = useMemo(
    () => getLongestSchedule(schedules),
    [schedules]
  )

  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(scheduleLongest.color as Colors),
    [scheduleLongest]
  )

  return (
    <Pressable
      className="w-full rounded-lg px-1 pt-1"
      style={[cardStyle, { height: scheduleLongest.height }]}
    >
      <Text
        style={textStyle}
        className="font-bold mb-2"
      >{`这里有${schedules.length}门课冲突`}</Text>
      <Text style={textStyle} className="text-[11px]">
        点击查看详情
      </Text>
    </Pressable>
  )
}

const ScheduleCard = ({ schedule }: { schedule: CourseSchedule }) => {
  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(schedule.color as Colors),
    [schedule]
  )

  return (
    <View
      className={
        'w-full h-full rounded-md px-1 pt-2 pb-4 justify-between items-center'
      }
      style={[cardStyle, { height: schedule.height }]}
    >
      <Text style={textStyle} className="font-bold text-xs">
        {formatCourseName(schedule.courseName)}
      </Text>
      <Text style={textStyle} className="text-[10px]">
        {formatRoom(schedule.room)}
      </Text>
    </View>
  )
}
