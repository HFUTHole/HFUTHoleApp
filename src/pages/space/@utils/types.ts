import type { SpaceCourseState } from '@/store/reducer/spaceCourse'
import { CARD_COLORS_KEYS } from '@/pages/space/@utils/utils'
import type { ReactNode } from 'react'

// 日程页面下的类型
export type Schedule = ISchedule & ILesson & { color: string }

// 课表页面下的类型
export type CourseSchedule = Schedule & { height: number }

export type UnitSchedule = Schedule | CourseSchedule

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

export type HelpType = 'common' | 'login' | 'score' | 'course' | 'grammar'
