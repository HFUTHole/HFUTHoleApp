import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'

export function getUsedGoodsList(params: PaginateAble) {
  return request<IUsedGoodsResponse>({
    method: 'GET',
    url: '/used-goods/list',
    params,
  })
}

export function getUsedGoodsDetail(params: { id: string }) {
  return request<IUsedGoodsDetailResponse>({
    method: 'GET',
    url: '/used-goods/detail',
    params,
  })
}

export function deleteUsedGoodsCollect(data: { id: string }) {
  return request({
    method: 'DELETE',
    url: '/used-goods/collect',
    data,
  })
}

export function postUsedGoodsCollect(data: { id: string }) {
  return request({
    method: 'POST',
    url: '/used-goods/collect',
    data,
  })
}

export function getUsedGoodsComment(params: { id: string } & PaginateAble) {
  return request<IHoleCommentListResponse>({
    method: 'GET',
    url: '/used-goods/comment',
    params,
  })
}

export function postUsedGoodsComment(data: { id: string; body: string }) {
  return request({
    method: 'POST',
    url: '/used-goods/comment',
    data,
  })
}
