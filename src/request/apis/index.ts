import * as HoleApis from './hole'
import * as UserApis from './user'
import * as TagApis from './tag'
import * as UsedGoodsApis from './used-goods'
import { request } from '@/request/request'

export const Apis = {
  hole: {
    ...HoleApis,
    delete(data: { id: number }) {
      return request({
        method: 'DELETE',
        url: '/post/delete',
        data,
      })
    },
  },
  user: UserApis,
  tag: TagApis,
  usedGoods: UsedGoodsApis,
}
