import { useHoleSearchResult } from '@/swr/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HoleSearchHeader } from '@/pages/hole/search/header'

export interface ISearchResultParams {
  keywords: string
}

export function HoleSearchResult() {
  const query = useHoleSearchResult()

  return (
    <SafeAreaView className={'px-2'}>
      <HoleSearchHeader />
      <RefreshableHoleList {...query} />
    </SafeAreaView>
  )
}
