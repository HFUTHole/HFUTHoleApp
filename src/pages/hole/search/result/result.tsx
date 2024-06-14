import { useHoleSearchResult } from '@/swr/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import { TabView } from '@/components/TabView'
import { useUsedGoodsSearch } from '@/swr/market/search'
import { UsedGoodsColumnList } from '@/pages/market/components/UsedGoodsColumnList'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useTheme } from 'react-native-paper'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'
import React, { useState } from 'react'
import { PopoverSelect } from '@/components/Popover/PopoverSelect'
import { match } from 'ts-pattern'
import { UsedGoodsSearchPriceType } from '@/request/apis/used-goods'

export interface ISearchResultParams {
  keywords: string
}

const PostedSearchResult = () => {
  const query = useHoleSearchResult()

  return <RefreshableHoleList showFab={false} {...query} />
}

enum OrderEnum {
  price_desc = '价格降序',
  price_asc = '价格升序',
  latest = '最新',
}

const UsedGoodsSearchResult = () => {
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.latest)
  const [area, setArea] = useState<SchoolAreaEnum>(SchoolAreaEnum.all)

  const priceOrder = match(order)
    .with(OrderEnum.price_desc, () => 'desc')
    .with(OrderEnum.price_asc, () => 'asc')
    .otherwise(() => 'latest') as UsedGoodsSearchPriceType

  const query = useUsedGoodsSearch({
    area: area,
    price: priceOrder,
  })

  const theme = useTheme()

  return (
    <LoadingScreen isLoading={query.isLoading}>
      <View className={'flex-1 bg-[#f1f4f2]'}>
        <View
          className={
            'flex-row items-center bg-white py-4 w-full border-y-[1px] border-y-black/5 pl-[5vw]'
          }
        >
          <View className={'flex-1 justify-start'}>
            <PopoverSelect
              enum={OrderEnum}
              state={order}
              setState={setOrder}
              fromText={order}
              textClassName={'text-primary font-bold'}
              iconColor={theme.colors.primary}
              iconSize={8}
            />
          </View>
          <View className={'flex-1 flex-row space-x-1 items-center'}>
            <PopoverSelect
              enum={SchoolAreaEnum}
              state={area}
              setState={setArea}
              fromText={area}
              textClassName={'text-primary-label font-bold'}
              iconSize={8}
            />
          </View>
        </View>
        <UsedGoodsColumnList showFab={false} {...query} />
      </View>
    </LoadingScreen>
  )
}

export function HoleSearchResult() {
  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <HoleSearchHeader />
      <TabView
        tabs={[
          {
            key: 'posted',
            title: '帖子',
            component: PostedSearchResult,
          },
          {
            key: 'used-goods',
            title: '二手宝贝',
            component: UsedGoodsSearchResult,
          },
        ]}
      />
    </SafeAreaView>
  )
}
