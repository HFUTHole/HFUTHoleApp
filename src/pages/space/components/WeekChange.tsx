import type { ScheduleKey } from '@/pages/space/@utils/types'
import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { AngleLeftIcon, AngleRightIcon } from '@/components/icon'
import { Text } from 'react-native-paper'
import { useChangeWeek } from '@/pages/space/@utils/useWeekChange'

interface Props {
  text: string
  scheduleKey: ScheduleKey
}

export const WeekChange = ({ text, scheduleKey }: Props) => {
  const { onPrev, onNext } = useChangeWeek(scheduleKey)

  return (
    <View className="flex flex-row justify-between items-center">
      <IconButton
        icon={() => <AngleLeftIcon size={20} />}
        transparent
        onPress={onPrev}
      />
      <Text variant="bodyLarge">{text}</Text>
      <IconButton
        icon={() => <AngleRightIcon size={20} />}
        transparent
        onPress={onNext}
      />
    </View>
  )
}
