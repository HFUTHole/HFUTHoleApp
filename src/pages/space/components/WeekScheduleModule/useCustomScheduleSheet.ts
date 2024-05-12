import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { CustomScheduleFormValidator } from '@/shared/validators/space/schedule'
import { LESSON_INDEX_TO_TIME } from '@/pages/space/@utils/constant'
import { Colors, UnitSchedule } from '@/pages/space/@utils/types'
import { useMutation } from 'react-query'
import { addScheduleRequest, updateScheduleRequest } from '@/request/space/user'
import { AxiosError } from 'axios'
import { getQAQFont } from '@/shared/utils/utils'
import { ICustomScheduleDto } from '@/request/space/user'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useAppSelector } from '@/store/store'
import { useCurrentSemester } from '@/shared/context/space/semester'

interface DiyScheduleSheetParams {
  /**
   * @description 第一项是周几，第二项是 lessonIndex
   */
  weekLayoutIndex: number[]
  currentWeekIndex: number
  customSchedule?: UnitSchedule
  onAddScheduleSuccess?: () => void
}

export const useCustomScheduleSheet = ({
  currentWeekIndex,
  weekLayoutIndex,
  customSchedule,
  onAddScheduleSuccess,
}: DiyScheduleSheetParams) => {
  const courseInfo = useAppSelector((state) => state.spaceCourse.courseInfo)
  const { selectedSemesterId } = useCurrentSemester()
  const [activeColor, setActiveColor] = useState<Colors>('red')
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 0])
  const {
    formState: { errors },
    control,
    setError,
    handleSubmit,
    reset,
    setValue,
  } = useForm<CustomScheduleFormValidator>({
    resolver: classValidatorResolver(CustomScheduleFormValidator),
    mode: 'onSubmit',
  })

  const isUpdateSchedule = useMemo(() => !!customSchedule, [customSchedule])

  const mutation = useMutation({
    mutationFn: isUpdateSchedule ? updateScheduleRequest : addScheduleRequest,
    onError(error: AxiosError) {
      if (error.code) {
        setError('reqFailedError' as any, {
          message:
            (error?.response?.data as any)?.msg ||
            `网络连接失败，可能是服务器炸了${getQAQFont('sadness')}`,
        })
      }
    },
    onSuccess() {
      onAddScheduleSuccess?.()
      initState()
    },
    retry: false,
  })

  const onSubmit = useDebounce((formData: CustomScheduleFormValidator) => {
    let payload: ICustomScheduleDto
    if (isUpdateSchedule) {
      payload = {
        id: customSchedule!.diyId,
        semesterId: selectedSemesterId,
        name: formData.title,
        color: activeColor,
        mark: formData.mark ?? '',
        schedule: {
          room: formData.location ?? '',
          startTime: LESSON_INDEX_TO_TIME[timeRange[0]].startTime,
          endTime: LESSON_INDEX_TO_TIME[timeRange[1]].endTime,
          weeks: [currentWeekIndex + 1],
          weekDay:
            courseInfo.schedule[currentWeekIndex].findIndex((week) =>
              week.some(
                (schedule) =>
                  schedule.lessonIndex === customSchedule!.lessonIndex,
              ),
            ) + 1,
        },
      }
    } else {
      payload = {
        semesterId: selectedSemesterId,
        name: formData.title,
        color: activeColor,
        mark: formData.mark ?? '',
        schedule: {
          room: formData.location ?? '',
          startTime: LESSON_INDEX_TO_TIME[timeRange[0]].startTime,
          endTime: LESSON_INDEX_TO_TIME[timeRange[1]].endTime,
          weekDay: weekLayoutIndex[0] + 1,
          weeks: [currentWeekIndex + 1],
        },
      }
    }
    mutation.mutate(payload)
  })

  const handleColorPress = (colorKey: Colors) => setActiveColor(colorKey)

  const initState = () => {
    setTimeRange(
      weekLayoutIndex[0] < 0
        ? [0, 0]
        : [weekLayoutIndex[1] - 1, weekLayoutIndex[1] - 1],
    )
    setActiveColor('red')
    reset()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initState, [weekLayoutIndex, currentWeekIndex])

  // 当 customSchedule 存在时，初始化 state
  useEffect(() => {
    if (!customSchedule) {
      return
    }
    setValue('title', customSchedule.courseName)
    customSchedule.detailInfo.mark &&
      setValue('mark', customSchedule.detailInfo.mark)
    customSchedule.room && setValue('location', customSchedule.room)
    setActiveColor(customSchedule.color as Colors)
    setTimeRange([
      LESSON_INDEX_TO_TIME.findIndex(
        (item) => item.startTime === customSchedule.startTime,
      ),
      LESSON_INDEX_TO_TIME.findIndex(
        (item) => item.endTime === customSchedule.endTime,
      ),
    ])
  }, [customSchedule, setValue])

  return {
    onSubmit,
    control,
    errors,
    activeColor,
    timeRange,
    mutation,
    isUpdateSchedule,
    handleColorPress,
    handleSubmit,
    setTimeRange,
  }
}
