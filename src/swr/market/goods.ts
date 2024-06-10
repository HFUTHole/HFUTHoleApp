import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import {
  GetUserFavoriteHoleListRequest,
  GetUserPostedHoleListRequest,
} from '@/request/apis/user'
import { useParams } from '@/shared/hooks/useParams'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'
import { Apis } from '@/request/apis'
import { useBaseQuery } from '@/swr/useBaseQuery'

const itemsData = {
  data: {
    items: [
      {
        id: 'c1f9e910-d608-4fd4-b6db-acb0597bddc8',
        createAt: '2024-06-02T04:36:06.767Z',
        body: '出一个iPad 2024最新版',
        price: 9999,
        area: '宣城',
        status: 0,
        imgs: [
          'http://sns-webpic-qc.xhscdn.com/202406022035/4e895de6be26da24c6e15482871e7028/1040g008313bam29pg4005njv44h08a0npiumoio!nd_dft_wlteh_webp_3',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '3d73e80b-a542-45d8-8447-290148b5a761',
        createAt: '2024-06-02T04:33:29.026Z',
        body: '出一个超级可爱的书包',
        price: 245,
        area: '宣城',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022031/7ee23ab8a05a272bec5f43bd774cdfc4/1040g2sg311hcodromq005okato48dd0gslh62k0!nc_n_webp_mw_1',
          'https://sns-webpic-qc.xhscdn.com/202406022031/55d221b558e8bdf95f9fa71c220af49c/1040g2sg311hcodromq0g5okato48dd0gt5vacqg!nd_dft_wlteh_webp_3',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '99c24868-9309-4c9a-a937-e671fabf8902',
        createAt: '2024-06-02T04:30:40.506Z',
        body: '出一张4090',
        price: 9999,
        area: '翡翠湖',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022029/8d7b23cacf63b300a156577c3ac378eb/1040g008312he8mu770005nqng0vg88n5k21a09o!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '53256ccc-6b74-49f4-9134-7871921cd009',
        createAt: '2024-06-02T04:30:34.544Z',
        body: '出一张4090',
        price: 1.22,
        area: '翡翠湖',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022029/8d7b23cacf63b300a156577c3ac378eb/1040g008312he8mu770005nqng0vg88n5k21a09o!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '385d4a18-f227-4c4f-8b33-e17f3b813bb6',
        createAt: '2024-06-02T04:29:38.657Z',
        body: '石膏娃娃～库洛米，石膏娃娃涂鸦，存钱罐，治愈又解压。受欢迎的库洛米，也太好看了吧～',
        price: 1.22,
        area: '屯溪路',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022029/6be74878c7a7f7c95fdb2a99bfdaec73/1000g00824bd9g5afq0005ojnajpocg829t0ofl8!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: '2051ecea-4226-4730-b650-f949ad70f790',
        createAt: '2024-06-02T04:28:30.221Z',
        body: '卖一个我最喜欢的小熊熊',
        price: 1.22,
        area: '屯溪路',
        status: 1,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022027/feed2f53990553b6c6d19c1864cb3e33/1000g0082hi95a3kj40605n6djfk4e5bp2to3qro!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
      {
        id: 'a30c7e84-3373-4ec9-a719-3fc2aa70c85f',
        createAt: '2024-06-02T04:24:35.213Z',
        body: '一个迷你相机！！！',
        price: 1.22,
        area: '宣城',
        status: 0,
        imgs: [
          'https://sns-webpic-qc.xhscdn.com/202406022023/306ab6f185b32910b9695194fe302c5f/1040g008311p77n6n7c6g4b8g8j64cabem38bisg!nc_n_webp_mw_1',
        ],
        creator: {
          id: 2,
          createAt: '2024-05-17T03:39:17.693Z',
          username: 'aaabbbss',
          role: 'admin',
          avatar:
            'https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=aaabbbss',
        },
      },
    ],
    meta: {
      totalItems: 7,
      itemCount: 7,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
  },
  msg: '获取成功',
  code: 200,
}

export function useUsedGoodsList() {
  const query = useBaseInfiniteQuery({
    queryKey: ['used-goods.list'],
    queryFn: ({ pageParam = 1 }) => {
      return Apis.usedGoods.getUsedGoodsList({
        page: pageParam,
        limit: 10,
      })
    },
  })

  return {
    ...query,
  }
}

export function useUsedGoodsDetail() {
  const { id } = useParams<{ id: string }>()

  const query = useBaseQuery({
    queryKey: ['used-goods.detail', id],
    queryFn: () => {
      return Apis.usedGoods.getUsedGoodsDetail({
        id,
      })
    },
  })

  return {
    ...query,
  }
}

export function useMarketFavoriteGoodsList() {
  const query = useInfiniteQuery(
    'market.goods.fav-list',
    ({ pageParam = 1 }) =>
      Promise.resolve({
        ...itemsData.data,
        meta: {
          totalItems: 7 * 5,
          itemCount: 7,
          itemsPerPage: 7,
          totalPages: 5,
          currentPage: pageParam,
        },
      }),
    {
      getNextPageParam: (lastPages) => {
        const nextPage = lastPages.meta.currentPage + 1

        if (
          nextPage > lastPages.meta.totalPages ||
          lastPages.items.length === 0
        ) {
          return
        }

        return nextPage
      },
    },
  )

  const client = useQueryClient()

  const invalidateQuery = async (onlyFirstGroup = true) => {
    client.setQueryData<InfiniteData<IHoleListResponse>>(
      'market.goods.fav-list',
      (oldData) => {
        if (onlyFirstGroup) {
          // 确保刷新时只更换第一组数据，其他组的数据全都销毁
          oldData!.pages = oldData!.pages.slice(0, 1)
        }
        return oldData!
      },
    )
    await client.invalidateQueries('market.goods.fav-list', {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  return {
    ...query,
    invalidateQuery,
  }
}
