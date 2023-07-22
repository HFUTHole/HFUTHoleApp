import { StatusBar, View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useHoleCategoryList } from '@/swr/hole/category'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { HoleCategoryHeader } from '@/pages/hole/category/Header'
import { HoleModeTabs } from '@/router/ModeTabs'

export function HoleCategoryScreen(props) {
  const query = useHoleCategoryList(props.category)

  return (
    <LoadingScreen isLoading={query.isLoading} id={1}>
      <View className={'px-2 bg-background'}>
        <RefreshableHoleList
          {...query}
          ListHeaderComponent={HoleCategoryHeader}
        />
      </View>
    </LoadingScreen>
  )
}
