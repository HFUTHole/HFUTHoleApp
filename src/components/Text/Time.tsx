import { formatDate } from '@/shared/utils/utils'
import { Text, useTheme } from 'react-native-paper'
import type { Props as TextProps } from 'react-native-paper/src/components/Typography/Text'

type Props = {
  time: string
  textLeft?: string
  textRight?: string
} & Partial<TextProps<any>>

export function TimeText({ time, textLeft, textRight, ...props }: Props) {
  return (
    <Text
      className={'text-xs text-tertiary-label'}
      {...props}
      style={{
        fontSize: 12,
        ...(props.style as object),
      }}
    >
      {textLeft}
      {formatDate(time)}
      {textRight}
    </Text>
  )
}
