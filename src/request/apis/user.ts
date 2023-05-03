import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'

export function GetUserProfileRequest() {
  return request<IUserProfile>({
    method: 'GET',
    url: '/user/profile',
  })
}

export function GetUserFavoriteHoleListRequest(params: PaginateAble) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/user/hole/favorite',
    params,
  })
}

export function GetUserPostedHoleListRequest(params: PaginateAble) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/user/hole/list',
    params,
  })
}
