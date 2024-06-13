import React from 'react'
import { Alert, Pressable, Text } from 'react-native'
import { Toast } from '@/shared/utils/toast'
import { useUsedGoodsEditMutation } from '@/swr/market/editor'
import { UsedGoodsUserGoodsListItem } from '@/pages/market/my-goods/MyGoods'
import { UsedGoodsStatusEnum } from '@/shared/enums/used-goods-status.enum'

export const MyGoodsOfflineGoods: React.FC<{
  data: UsedGoodsUserGoodsListItem
}> = (props) => {
  const { data } = props

  const mutation = useUsedGoodsEditMutation({
    onSuccess() {
      Toast.success({
        text1: '下架成功',
      })
    },
  })

  return (
    <Pressable
      className={'px-3 py-1 rounded-full border-[1px] border-black/10'}
      onPress={() => {
        Alert.alert('下架', '确定要这个宝贝吗？', [
          {
            text: '取消',
            onPress() {},
          },
          {
            text: '确定',
            onPress() {
              mutation.mutate({
                id: data.id,
                status: UsedGoodsStatusEnum.offline,
              })
            },
          },
        ])
      }}
    >
      <Text>下架</Text>
    </Pressable>
  )
}
