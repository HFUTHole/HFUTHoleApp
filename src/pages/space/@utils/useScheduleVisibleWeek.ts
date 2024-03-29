import type {
  ScheduleKey,
  ScheduleVisibleWeek,
} from '@/pages/space/@utils/types'
import { useAppSelector } from '@/store/store'
import { getCourseDate } from '@/pages/space/@utils/utils'
import { useMemo } from 'react'
import { format } from 'date-fns'

const defaultStartDate = '2023-01-01'

export const useScheduleVisibleWeek = (scheduleKey: ScheduleKey) => {
  const spaceCourse = useAppSelector((state) => state.spaceCourse)
  const { curWeek, semesterStartDate: startDate } =
    spaceCourse.courseInfo.mainInfo
  const { dayIdx, weekIdx } = spaceCourse[scheduleKey]
  const semesterStartDate = startDate || defaultStartDate

  const scheduleVisibleWeek = useMemo<ScheduleVisibleWeek[]>(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const date = getCourseDate({
          weekIdx,
          dayIdx: i,
          startTime: semesterStartDate,
        })
        const active =
          scheduleKey === 'daySchedule'
            ? dayIdx === i
            : weekIdx === curWeek - 1 && dayIdx === i

        return {
          weekday: format(date, 'EEE.'),
          day: format(date, 'dd'),
          monthAndDate: format(date, 'MM/dd'),
          active,
        }
      }),
    [weekIdx, semesterStartDate, scheduleKey, dayIdx, curWeek]
  )

  return scheduleVisibleWeek
}
