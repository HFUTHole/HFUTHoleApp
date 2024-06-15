import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'

export function GetUserProfileRequest(params?: { userId: number }) {
  return request<IUserProfile>({
    method: 'GET',
    url: '/user/profile',
    params,
  })
}

export function getAnotherUserProfileRequest(params?: { userId: number }) {
  return request<IUserProfile>({
    method: 'GET',
    url: '/user/other-profile',
    params,
  })
}

export function GetUserFavoriteHoleListRequest(
  params: PaginateAble & { userId?: number },
) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/user/post/favorite',
    params,
  })
}

export function GetUserPostedHoleListRequest(
  params: PaginateAble & { userId?: number },
) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/user/post/list',
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

export type UserFollowingType = 'following' | 'followers'

export function getUserFollowingRequest(params: {
  userId: number
  type: UserFollowingType
}) {
  return request<IUserFollowingResponse>({
    method: 'GET',
    url: '/user/following/list',
    params,
  })
}
