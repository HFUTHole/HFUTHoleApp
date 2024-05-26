import { View } from 'react-native'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'
import { Header } from '@/pages/space/day-schedule/components/Header'
import { ScheduleList } from '@/pages/space/day-schedule/components/ScheduleList'
import { ScheduleScrollWrapper } from '@/pages/space/components/ScheduleScrollWrapper'
import { useInitializeSpace } from '@/pages/space/@utils/useInitializeSpace'
import { useSpaceCourse } from '@/swr/space/course'

export const DaySchedule = () => {
  const { isFetching, refetch } = useSpaceCourse()
  useInitializeSpace()

  return (
    <View className={'flex-1 bg-background'}>
      <ScheduleScrollWrapper isFetching={isFetching} onRefresh={refetch}>
        <Header />
        <ScheduleList />
      </ScheduleScrollWrapper>
    </View>
  )
}
