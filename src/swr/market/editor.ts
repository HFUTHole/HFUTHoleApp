import { useMutation, UseMutationOptions } from 'react-query'
import { Apis } from '@/request/apis'
import { EditUsedGoodsData } from '@/request/apis/used-goods'

interface Options
  extends UseMutationOptions<any, any, EditUsedGoodsData, unknown> {}

export function useUsedGoodsEditMutation(options: Options) {
  return useMutation({
    ...options,
    mutationKey: ['used-goods.edit', options.mutationKey],
    mutationFn: (data: EditUsedGoodsData) => {
      return Apis.usedGoods.editUsedGoods(data)
    },
  })
}
