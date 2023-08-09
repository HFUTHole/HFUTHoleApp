import type { Schedule } from '@/pages/space/@utils/types'
import type { ArrayElementType } from '@/shared/types/utils'
import type { Colors } from '@/pages/space/@utils/types'
import { useDaySchedule } from '@/pages/space/day-schedule/useDaySchedule'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { ListEmpty } from '@/components/image/ListEmpty'
import {
  formatRoom,
  generateCardStyle,
  getTeachers,
  isLaunchPeriod,
  formatCourseName,
  getLongestSchedule,
} from '@/pages/space/@utils/utils'
import React, {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { ScheduleSheet } from '@/pages/space/components/ScheduleSheet'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import type { UnitSchedule } from '@/pages/space/@utils/types'

type ScheduleListItem = ArrayElementType<
  ReturnType<typeof useDaySchedule>['scheduleList']
>

interface CardProps {
  scheduleListItem: ScheduleListItem
  openSheet: (schedule: UnitSchedule) => void
}

export const ScheduleList = () => {
  const [schedule, setSchedule] = useState<UnitSchedule>()
  const { scheduleList, todaySchedule } = useDaySchedule()
  const sheetRef = useRef() as MutableRefObject<BottomSheetModal>

  const openSheet = (schedule: UnitSchedule) => {
    setSchedule(schedule)
    sheetRef.current?.present()
  }

  return (
    <View
      className="w-full h-full bg-white overflow-hidden mt-10 rounded-t-3xl py-5"
      // 在 ScrollView 下，onTouchEnd 很难触发 https://github.com/facebook/react-native/issues/33229
    >
      {todaySchedule.length ? (
        <View className="p-4">
          {scheduleList.map((scheduleListItem) => (
            <View
              className="flex flex-row"
              key={scheduleListItem.timeLine.start}
            >
              <View className="relative" style={{ flex: 1 }}>
                <Text className="absolute -top-2 text-slate-400 text-xs">
                  {scheduleListItem.timeLine.start}
                </Text>
              </View>

              <View className="relative pb-2" style={{ flex: 5 }}>
                <View className="absolute -left-4 h-[1px] w-[200%] bg-slate-300/80" />
                <CourseCard
                  scheduleListItem={scheduleListItem}
                  openSheet={openSheet}
                />
              </View>
            </View>
          ))}
          <ScheduleSheet ref={sheetRef} schedule={schedule} />
        </View>
      ) : (
        <ListEmpty size={200} />
      )}
    </View>
  )
}

const CourseCard = ({ scheduleListItem, openSheet }: CardProps) => {
  const { schedules, timeLine } = scheduleListItem

  // 22:00 后不渲染
  if (timeLine.index === 7) {
    return null
  }

  if (isLaunchPeriod(timeLine.start)) {
    return (
      <View className="flex justify-center items-center rounded-lg h-12 bg-slate-200/50">
        <Text className="text-lg text-slate-400">午休</Text>
      </View>
    )
  }

  if (schedules.length === 0) {
    return <View className="h-24" />
  }

  // TODO 日程冲突情况
  if (schedules.length > 1) {
    return (
      <ConflictCard scheduleListItem={scheduleListItem} openSheet={openSheet} />
    )
  }

  return (
    <ScheduleCard
      schedule={schedules[0]}
      timeLine={timeLine}
      openSheet={openSheet}
    />
  )
}

const ConflictCard = ({
  scheduleListItem: { schedules, timeLine },
  openSheet,
}: CardProps) => {
  const sheetRef = useRef() as MutableRefObject<BottomSheetModal>

  const scheduleLongest = useMemo(
    () => getLongestSchedule(schedules),
    [schedules]
  )

  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(scheduleLongest.color as Colors, true),
    [scheduleLongest.color]
  )

  return (
    <>
      <Pressable
        style={cardStyle}
        className={`flex border border-l-2 justify-center h-24 p-3 rounded-lg mt-2`}
        onPress={() => sheetRef.current?.present()}
      >
        <Text style={textStyle} className="text-base font-bold">
          {`这里有${schedules.length}门课冲突`}
        </Text>
        <Text style={textStyle}>点击插件详情</Text>
      </Pressable>
      <BottomActionSheet ref={sheetRef} snapPoints={['25%', '50%']}>
        <BottomSheetScrollView>
          <View className="flex space-y-4 p-4">
            {schedules.map((schedule) => (
              <View key={schedule.courseName}>
                <ScheduleCard
                  openSheet={() => {
                    openSheet(schedule)
                    sheetRef.current?.close()
                  }}
                  schedule={schedule}
                  timeLine={timeLine}
                />
              </View>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomActionSheet>
    </>
  )
}

export interface ScheduleItemCardProps {
  schedule: Schedule
  timeLine: ScheduleListItem['timeLine']
  openSheet: (schedule: UnitSchedule) => void
}

const ScheduleCard = ({
  schedule,
  timeLine,
  openSheet,
}: ScheduleItemCardProps) => {
  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(schedule.color as Colors, true),
    [schedule.color]
  )

  const handlePress = useCallback(
    () => openSheet(schedule),
    [openSheet, schedule]
  )

  return (
    <>
      <Pressable
        style={cardStyle}
        className={`flex space-y-1 border border-l-2 justify-center py-4 px-2 rounded-lg ${
          timeLine.start === schedule.startTime ? '' : 'mt-2'
        }`}
        onPress={handlePress}
      >
        <View className="flex flex-row justify-between">
          <Text
            style={textStyle}
            className="text-xs"
          >{`${schedule.startTime} - ${schedule.endTime}`}</Text>
          <Text style={textStyle} className="text-xs">
            {getTeachers(schedule.detailInfo.teachers)}
          </Text>
        </View>
        <Text style={textStyle} className="text-base font-bold">
          {formatCourseName(schedule.courseName)}
        </Text>
        <Text style={textStyle}>{formatRoom(schedule.room)}</Text>
      </Pressable>
    </>
  )
}
