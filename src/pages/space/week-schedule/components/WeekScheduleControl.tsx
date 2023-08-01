import { Pressable, View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { AngleLeftIcon, AngleRightIcon } from '@/components/icon'
import { Text } from 'react-native-paper'
import { useChangeWeek } from '@/pages/space/@utils/useWeekChange'

export const WeekScheduleControl = () => {
  const { onPrev, onNext } = useChangeWeek('weekSchedule')

  return (
    <View className="w-full absolute left-0 bottom-12 px-5 flex flex-row justify-between">
      <Pressable
        className="w-16 h-16 rounded-full bg-gray-300/60 flex items-center justify-center"
        onPress={onPrev}
      >
        <AngleLeftIcon color="#00000099" size={32} />
      </Pressable>
      <Pressable
        className="w-16 h-16 rounded-full bg-gray-300/60 flex items-center justify-center"
        onPress={onNext}
      >
        <AngleRightIcon color="00000099" size={32} />
      </Pressable>
    </View>
  )
}
