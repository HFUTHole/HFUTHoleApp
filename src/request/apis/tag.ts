import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'

export function getTagDetail(tag: string) {
  return request<{
    views: number
    desc: string
    body: string
    isCollected: boolean
  }>({
    method: 'GET',
    url: '/post/tag/detail',
    params: {
      tag,
    },
  })
}

export function getTagPostList(params: { tag: string } & PaginateAble) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/post/list/tag',
    params,
  })
}
