import type { ScheduleKey } from '@/pages/space/@utils/types'
import { useAppSelector, useAppDispatch } from '@/store/store'
import { setDaySchedule, setWeekSchedule } from '@/store/reducer/spaceCourse'
import { useCallback } from 'react'

const prevBoundary = 0
const nextBoundary = 19

export const useChangeWeek = (scheduleKey: ScheduleKey) => {
  const schedule = useAppSelector((state) => state.spaceCourse[scheduleKey])
  const dispatch = useAppDispatch()
  const setAction =
    scheduleKey === 'daySchedule' ? setDaySchedule : setWeekSchedule

  const onPrev = useCallback(() => {
    if (schedule.weekIdx === prevBoundary) {
      dispatch(setAction({ ...schedule, weekIdx: nextBoundary }))
    } else {
      dispatch(setAction({ ...schedule, weekIdx: schedule.weekIdx - 1 }))
    }
  }, [dispatch, schedule, setAction])

  const onNext = useCallback(() => {
    if (schedule.weekIdx === nextBoundary) {
      dispatch(setAction({ ...schedule, weekIdx: prevBoundary }))
    } else {
      dispatch(setAction({ ...schedule, weekIdx: schedule.weekIdx + 1 }))
    }
  }, [dispatch, schedule, setAction])

  return {
    onPrev,
    onNext,
  }
}
