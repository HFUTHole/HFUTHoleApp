import { Text, TextProps, useTheme } from 'react-native-paper'
import clsx from 'clsx'

export function SecondaryText(props: TextProps<any>) {
  const theme = useTheme()

  return (
    <Text
      {...props}
      className={clsx(props.className)}
      style={{
        color: theme.colors.surfaceVariant,
        ...((props.style as object) || {}),
      }}
    ></Text>
  )
}
