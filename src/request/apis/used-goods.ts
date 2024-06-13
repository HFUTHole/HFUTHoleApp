import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'
import { UsedGoodsStatusEnum } from '@/shared/enums/used-goods-status.enum'

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

export function createUsedGoods(data: {
  body: string
  price: number
  imgs: string[]
  category: string
  area: SchoolAreaEnum
}) {
  return request({
    method: 'POST',
    url: '/used-goods/create',
    data,
  })
}

export function getUsedGoodsCategoryOrAreaList(
  params: { category?: string; area?: string } & PaginateAble,
) {
  return request<IUsedGoodsCategoryORAreaResponse>({
    method: 'GET',
    url: '/used-goods/list/category',
    params,
  })
}

export function getUsedGoodsCollectedList(params: PaginateAble) {
  return request<IUsedGoodsCollectedListResponse>({
    method: 'GET',
    url: '/used-goods/collect/list',
    params,
  })
}

export function getUsedGoodsUserGoodsList(params: PaginateAble) {
  return request<IUsedGoodsUserGoodsListResponse>({
    method: 'GET',
    url: '/used-goods/user/list',
    params,
  })
}

export interface EditUsedGoodsData {
  id: string
  price?: number
  body?: string
  status: UsedGoodsStatusEnum
  imgs?: string[]
}

export function editUsedGoods(data: EditUsedGoodsData) {
  return request({
    method: 'POST',
    url: '/used-goods/edit',
    data,
  })
}
