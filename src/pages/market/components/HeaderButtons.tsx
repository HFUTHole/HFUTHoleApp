import React, { useRef } from 'react'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { TouchableOpacity } from 'react-native'
import { AntdIcon } from '@/components/icon'

import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'

export const CategoriesButton: React.FC = () => {
  const { goAllCategories } = useUsedGoodsRoute()
  return (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-center"
        onPress={goAllCategories}
        activeOpacity={0.8}
      >
        <AntdIcon.appstore color={'#DF4C1C'} size={24} />
      </TouchableOpacity>
    </>
  )
}

export const MyGoodsCollectButton = () => {
  const { goFavorite } = useUsedGoodsRoute()

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={goFavorite}>
      <AntdIcon.shopping color={'#DF4C1C'} size={24} />
    </TouchableOpacity>
  )
}

export const MyGoodsPostedButton = () => {
  const { goMy } = useUsedGoodsRoute()
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={goMy}>
      <AntdIcon.isv color={'#DF4C1C'} size={24} />
    </TouchableOpacity>
  )
}
