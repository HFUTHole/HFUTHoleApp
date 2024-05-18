import type { Schedule } from '@/pages/space/@utils/types'
import { useMemo } from 'react'
import { useAppSelector } from '@/store/store'
import { getCourseDate } from '@/pages/space/@utils/utils'
import { CARD_COLORS_KEYS } from '@/pages/space/@utils/constant'
import { useMount } from 'ahooks'
import { format } from 'date-fns'
import { JSONDeepClone } from '@/shared/utils/utils'
import { initializeCourseSchedule } from '@/pages/space/@utils/spaceCourseStore'
import { useCurrentSemester } from '@/shared/context/space/semester'
import { DAY_HOURS } from '@/pages/space/@utils/constant'

const defaultVisibleDate = '01月01号'

export const useDaySchedule = () => {
  const { selectedSemesterId, currentSemesterId } = useCurrentSemester()
  const { daySchedule, courseInfo } = useAppSelector(
    (state) => state.spaceCourse
  )
  const campus = useAppSelector((state) => state.spaceUser.info.campus)

  const timeLines = useMemo(() => {
    const hoursClone = JSONDeepClone(DAY_HOURS)
    if (campus === '翡翠湖校区') {
      hoursClone[0].start = '08:10'
      hoursClone[2].start = '12:10'
    }
    return hoursClone
  }, [campus])

  const todaySchedule = useMemo(
    () => courseInfo.schedule[daySchedule.weekIdx][daySchedule.dayIdx],
    [daySchedule, courseInfo]
  )

  const scheduleList = useMemo(
    () =>
      timeLines.map((timeLine) => {
        const schedules = todaySchedule
          .filter((schedule) => schedule.index === timeLine.index)
          .map<Schedule>((schedule) => {
            const lesson = courseInfo.lessons[schedule.lessonIndex || 0]
            const color = lesson.detailInfo.color
              ? lesson.detailInfo.color
              : CARD_COLORS_KEYS[
                  schedule.lessonIndex % (CARD_COLORS_KEYS.length - 1)
                ]

            return {
              ...schedule,
              ...lesson,
              color,
            }
          })

        return {
          timeLine,
          schedules,
        }
      }),
    [timeLines, todaySchedule, courseInfo]
  )

  const visibleDate = useMemo(() => {
    const semesterStartDate = courseInfo.mainInfo.semesterStartDate
    if (!semesterStartDate) {
      return defaultVisibleDate
    }
    return format(
      getCourseDate({
        ...daySchedule,
        startTime: semesterStartDate,
      }),
      'MM月dd号'
    )
  }, [daySchedule, courseInfo])

  // 根据当前日期做初始化
  useMount(() => {
    initializeCourseSchedule(selectedSemesterId, currentSemesterId)
    // dispatch(changeSchedule())
  })

  return {
    todaySchedule,
    daySchedule,
    visibleDate,
    scheduleList,
  }
}
