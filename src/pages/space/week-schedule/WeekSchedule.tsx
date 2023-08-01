import { PlainPage } from '@/components/Page'
import { ScheduleScrollWrapper } from '@/pages/space/components/ScheduleScrollWrapper'
import { Header } from '@/pages/space/week-schedule/components/Header'
import { View } from 'react-native'
import { CourseList } from '@/pages/space/week-schedule/components/CourseList'
import { WeekScheduleControl } from '@/pages/space/week-schedule/components/WeekScheduleControl'

export const WeekSchedule = () => {
  return (
    <PlainPage>
      <View className="w-full h-24 absolute z-[1] top-0 left-0">
        <Header />
      </View>
      <ScheduleScrollWrapper>
        <View className="my-24 w-full">
          <CourseList />
        </View>
      </ScheduleScrollWrapper>
      <WeekScheduleControl />
    </PlainPage>
  )
}
