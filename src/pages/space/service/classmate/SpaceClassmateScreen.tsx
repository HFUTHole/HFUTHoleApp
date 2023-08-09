import { View } from 'react-native'
import { useSpaceClassmateQuery } from '@/swr/space/course/classmate'
import { LoadingScreen } from '@/components/LoadingScreen'

export function SpaceClassmateScreen() {
  const { data, isLoading, isError } = useSpaceClassmateQuery()
  return (
    <LoadingScreen isLoading={isLoading}>
      <View></View>
    </LoadingScreen>
  )
}
