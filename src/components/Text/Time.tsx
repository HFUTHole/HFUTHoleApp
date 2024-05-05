import { formatDate } from '@/shared/utils/utils'
import { Text, useTheme } from 'react-native-paper'
import type { Props as TextProps } from 'react-native-paper/src/components/Typography/Text'

type Props = {
  time: string
} & Partial<TextProps<any>>

export function TimeText({ time, ...props }: Props) {
  return (
    <Text
      className={'text-xs text-tertiary-label'}
      {...props}
      style={{
        fontSize: 12,
        ...(props.style as object),
      }}
    >
      {formatDate(time)}
    </Text>
  )
}
