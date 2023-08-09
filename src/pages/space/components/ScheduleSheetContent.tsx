import { ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { getTeachers } from '@/pages/space/@utils/utils'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { ScheduleItemCardProps } from '@/pages/space/day-schedule/components/ScheduleList'
import { useMemo } from 'react'
import { Svg } from '@/components/svg/Svg'
import LocationSvg from '@/assets/svg/icons/location.svg'
import LabelSvg from '@/assets/svg/icons/label.svg'
import WeekSvg from '@/assets/svg/icons/week.svg'
import ClassRoomSvg from '@/assets/svg/icons/classroom.svg'
import StudentSvg from '@/assets/svg/icons/student.svg'
import CourseCategorySvg from '@/assets/svg/icons/course_category.svg'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { getRandomQAQ } from 'qaq-font'

type Props = Pick<ScheduleItemCardProps, 'schedule'>

const ScheduleSheetHeader = ({ schedule }: Props) => {
  const headerContent = useMemo(
    () => [
      {
        title: '老师名字',
        value: getTeachers(schedule.detailInfo.teachers),
      },
      {
        title: '上课时间',
        value: `${schedule.startTime} - ${schedule.endTime}`,
      },
    ],
    [schedule]
  )

  return (
    <View className={'space-y-5'}>
      <View className={'space-y-4'}>
        <View className={'flex-row space-x-4 items-center'}>
          <View className={'w-1 h-6 bg-[#5c7ef1] rounded-full'} />
          <Text variant={'titleMedium'}>
            {schedule.courseName}({schedule.detailInfo.code})
          </Text>
        </View>
        <View className={'flex-row justify-between'}>
          {headerContent.map((item) => (
            <View className={'space-y-2 px-5 items-center'} key={item.title}>
              <View>
                <SecondaryText variant={'bodyMedium'}>
                  {item.title}
                </SecondaryText>
              </View>
              <Text variant={'bodyMedium'}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className={'bg-onBackground h-[1px]'} />
    </View>
  )
}

export function ScheduleSheetContent({
  schedule,
}: Pick<ScheduleItemCardProps, 'schedule'>) {
  const detailContentList = useMemo(
    () => [
      {
        icon: LocationSvg,
        title: '上课地点',
        value: schedule.room,
      },
      {
        icon: LabelSvg,
        title: '学分',
        value: schedule.detailInfo.credits,
      },
      {
        icon: ClassRoomSvg,
        title: '上课班级',
        value: schedule.detailInfo.adminClass,
      },
      {
        icon: WeekSvg,
        title: '上课周数',
        value:
          schedule.detailInfo.weeks ||
          `暂时没有上课周数的数据哦${getRandomQAQ('sadness')}`,
      },
      {
        icon: StudentSvg,
        title: '学生人数',
        value: schedule.detailInfo.studentCount,
      },
      {
        icon: CourseCategorySvg,
        title: '课程类型',
        value: schedule.detailInfo.courseTypeName,
      },
    ],
    [schedule]
  )

  return (
    <>
      <View className={'p-6'}>
        <ScheduleSheetHeader schedule={schedule} />
      </View>
      <BottomSheetFlatList
        data={detailContentList}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderItem={({ item: Item }) => (
          <View className={'flex space-y-1 py-2'} key={Item.title}>
            <View className={'flex-row items-center'}>
              <View className={'w-8'}>
                <Svg SvgComponent={Item.icon} size={22} />
              </View>
              <Text variant={'titleMedium'}>{Item.title}</Text>
            </View>
            <View className={'flex-row'}>
              <View className={'w-8'} />
              <SecondaryText variant={'bodySmall'}>{Item.value}</SecondaryText>
            </View>
          </View>
        )}
      />
    </>
  )
}
