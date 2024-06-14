import React from 'react'
import { Alert, Pressable, Text } from 'react-native'
import { useUsedGoodsEditMutation } from '@/swr/market/editor'
import {
  UsedGoodsUserGoodsListItem,
  useOfflineGoodsListQuery,
} from '@/pages/market/my-goods/MyGoods'
import { UsedGoodsStatusEnum } from '@/shared/enums/used-goods-status.enum'
import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'
import { useUsedGoodsUserPostedList } from '@/swr/market/user'

export const MyGoodsOfflineGoods: React.FC<{
  data: UsedGoodsUserGoodsListItem
}> = (props) => {
  const { data } = props

  const offlineQuery = useOfflineGoodsListQuery()
  const postedQuery = useUsedGoodsUserPostedList()

  const mutation = useUsedGoodsEditMutation({
    onSuccess(data, vars) {
      if (vars.status === UsedGoodsStatusEnum.ok) {
        offlineQuery.refetch()
      } else {
        postedQuery.refetch()
      }
    },
  })

  const offlineGoods = () => {
    Alert.alert('下架', '确定要下架这个宝贝吗？', [
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
  }

  const onlineGoods = () => {
    Alert.alert('上架', '确定要重新上架这个宝贝吗？', [
      {
        text: '取消',
        onPress() {},
      },
      {
        text: '确定',
        onPress() {
          mutation.mutate({
            id: data.id,
            status: UsedGoodsStatusEnum.ok,
          })
        },
      },
    ])
  }

  const onPress = () => {
    if (data.status === UsedGoodsStatusEnum.ok) {
      offlineGoods()
    } else {
      onlineGoods()
    }
  }

  return (
    <Pressable
      className={'px-3 py-1 rounded-full border-[1px] border-black/10'}
      onPress={onPress}
    >
      <Text>{data.status === UsedGoodsStatusEnum.ok ? '下架' : '上架'}</Text>
    </Pressable>
  )
}

export const MyGoodsEditGoodsButton: React.FC<{
  data: UsedGoodsUserGoodsListItem
}> = (props) => {
  const { data } = props

  const { removeGoods } = useUsedGoodsUserPostedList()
  const { goCreate } = useUsedGoodsRoute()

  return (
    <Pressable
      className={'px-3 py-1 rounded-full border-[1px] border-black/10'}
      onPress={() => {
        goCreate(data.id, {
          isEditable: true,
        })
      }}
    >
      <Text>编辑</Text>
    </Pressable>
  )
}
