import { View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper'
import clsx from 'clsx'

export function Page(props: ViewProps) {
  const theme = useTheme()

  return (
    <SafeAreaView
      {...props}
      edges={['top']}
      className={clsx('flex-1 w-full px-3', props.className)}
      style={{
        backgroundColor: theme.colors.background,
      }}
    />
  )
}

// 不带px-2的page，RN机制有点蛋疼
export function PlainPage(props: ViewProps) {
  const theme = useTheme()

  return (
    <View
      {...props}
      className={`min-h-full w-full px-0 ${props.className}`}
      style={{
        backgroundColor: theme.colors.background,
      }}
    />
  )
}
