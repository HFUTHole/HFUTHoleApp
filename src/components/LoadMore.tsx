import { Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { getQAQFont } from '@/shared/utils/utils'

interface Props {
  text?: string
  hasNextPage: boolean
}

export function LoadMore({ hasNextPage, text }: Props) {
  const theme = useTheme()

  return (
    <View
      className={
        'w-screen px-5 justify-center flex flex-row items-center py-10'
      }
    >
      {hasNextPage ? (
        <LoadingIndicator />
      ) : (
        <Text style={{ color: theme.colors.surfaceVariant }}>
          {text ? text + getQAQFont('happy') : '没有更多了哦'}
        </Text>
      )}
    </View>
  )
}
