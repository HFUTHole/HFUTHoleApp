import type { SpaceCourseState } from '@/store/reducer/spaceCourse'
import { CARD_COLORS_KEYS } from '@/pages/space/@utils/utils'
import type { ReactNode } from 'react'

export type Schedule = ISchedule & ILesson & { color: string }

export type CourseSchedule = Schedule & { height: number }

export type ScheduleKey = Extract<
  keyof SpaceCourseState,
  'daySchedule' | 'weekSchedule'
>

export type Colors = typeof CARD_COLORS_KEYS

export interface ScoreInfo {
  key: keyof RankInfo
  title: string
  Icon: ReactNode
}
