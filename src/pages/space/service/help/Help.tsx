import { View } from 'react-native'
import { useParams } from '@/shared/hooks/useParams'
import { HelpType } from '@/pages/space/@utils/types'

interface RouteParams {
  type: HelpType
}

export const ScoreHelpScreen = () => {
  const params = useParams<RouteParams>()

  return <View></View>
}
