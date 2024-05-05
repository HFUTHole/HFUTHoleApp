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

export function PostUserProfileRequest(data: {
  avatar?: string
  username?: string
}) {
  return request<IMutationResponse>({
    method: 'POST',
    url: '/user/profile',
    data,
  })
}

export function GetUserCommentListRequest() {
  return request<IUserCommentListResponse>({
    method: 'GET',
    url: '/user/comments',
  })
}

interface FollowUserParams {
  userId: number
}

export function followUserRequest(data: FollowUserParams) {
  return request({
    method: 'POST',
    url: '/user/follow',
    data,
  })
}

export function unfollowUserRequest(data: FollowUserParams) {
  return request({
    method: 'DELETE',
    url: '/user/follow',
    data,
  })
}

export function isUserFollowedRequest(params: FollowUserParams) {
  return request<{ isFollowed: boolean }>({
    method: 'GET',
    url: '/user/isFollowed',
    params,
  })
}
