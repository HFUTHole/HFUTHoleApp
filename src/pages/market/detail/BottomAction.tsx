import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TouchableOpacity, View } from 'react-native'
import { StarIcon } from 'react-native-heroicons/outline'
import { StarIcon as SolidStarIcon } from 'react-native-heroicons/solid'
import { useBoolean } from 'ahooks'
import { useTheme } from 'react-native-paper'
import { Else, If, Then } from 'react-if'
import { useMutation } from 'react-query'
import { Apis } from '@/request/apis'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useBottomCommentContext } from '@/shared/context/hole/comment'

interface UsedGoodsDetailBottomActionProps {
  data: IUsedGoodsDetailResponse
}

const Star: React.FC<UsedGoodsDetailBottomActionProps> = ({ data }) => {
  const [isStared, isStaredActions] = useBoolean(!!data.isCollected)
  const [count, setCount] = useState(data.collectorCounts || 0)
  const theme = useTheme()

  const mutation = useMutation({
    mutationKey: ['goods.collect', isStared, data.id],
    mutationFn: () => {
      const func = isStared
        ? Apis.usedGoods.deleteUsedGoodsCollect
        : Apis.usedGoods.postUsedGoodsCollect

      return func({ id: data.id })
    },
  })

  const onPress = () => {
    if (isStared) {
      setCount((prev) => prev - 1)
    } else {
      setCount((prev) => prev + 1)
    }

    isStaredActions.toggle()

    mutation.mutate()
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View className={'items-center'}>
        <If condition={isStared}>
          <Then>
            <SolidStarIcon color={theme.colors.primary} />
          </Then>
          <Else>
            <StarIcon color={'#000'} />
          </Else>
        </If>
        <Text className={'text-tertiary-label text-xs'}>{count}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const UsedGoodsDetailBottomAction: React.FC<
  UsedGoodsDetailBottomActionProps
> = ({ data }) => {
  const { openInput } = useBottomCommentContext()

  return (
    <View className={'absolute w-full bg-white bottom-0'}>
      <SafeAreaView edges={['bottom']}>
        <View
          className={
            'px-[5vw] w-full bg-white flex-row justify-between items-center'
          }
        >
          <Star data={data} />
          <TouchableOpacity
            activeOpacity={0.7}
            className={'bg-primary rounded-full px-4 py-2'}
          >
            <Text
              className={'text-white font-bold text-sm'}
              onPress={() => openInput()}
            >
              我想要
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
