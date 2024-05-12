import { request } from '@/request/request'
import { IdAble, PaginateAble } from '@/shared/types'
import { PostHoleValidator } from '@/shared/validators/hole'
import {
  ArticleCategoryEnum,
  HoleDetailCommentMode,
  HoleDetailCommentOrderMode,
  HoleListMode,
} from '@/shared/enums'
import { HoleDetailPostComment } from '@/shared/validators/hole.detail'
import { SearchValidator } from '@/shared/validators/hole/search'
import { ImagePickerResult } from 'expo-image-picker'
import { Config } from '@/shared/config'
import { HoleClassification } from '@/shared/enums/category.enum'

interface Id {
  id: number
}

export function GetHoleListRequest(
  params: PaginateAble<{
    mode: HoleListMode
    classification?: HoleClassification
    category?: ArticleCategoryEnum
    subClassification?: string
  }>,
) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/post/list',
    params,
  })
}

export function PostHoleRequest(
  data: Omit<PostHoleValidator, 'vote'> & {
    vote?: { items: string[]; endTime: string }
  },
) {
  return request<IMutationResponse>({
    method: 'POST',
    url: '/post/create',
    data,
  })
}

export function GetHoleDetailRequest(params: Id & { commentId?: string }) {
  return request<IHoleDetailResponse>({
    method: 'GET',
    url: '/post/detail',
    params,
  })
}

export function GetHoleDetailCommentsRequest(
  params: PaginateAble<
    {
      mode: HoleDetailCommentMode
      order: HoleDetailCommentOrderMode
      commentId?: string
    } & Id
  >,
) {
  return request<IHoleCommentListResponse>({
    method: 'GET',
    url: '/post/comment',
    params,
  })
}

export function PostHoleDetailCommentRequest(data: HoleDetailPostComment) {
  return request<IMutationResponse>({
    method: 'POST',
    url: '/post/comment',
    data,
  })
}

export function PostLikeHoleRequest(data: Id) {
  return request<IMutationResponse>({
    method: 'POST',
    url: '/post/like',
    data,
  })
}

export function DeleteLikeHoleRequest(data: Id) {
  return request<IMutationResponse>({
    method: 'DELETE',
    url: '/post/like',
    data,
  })
}

export function SearchHoleRequest(params: PaginateAble<SearchValidator>) {
  return request<ISearchHoleResponse>({
    method: 'GET',
    url: '/post/search',
    params,
  })
}

export function UploadHoleImgRequest(imgs: ImagePickerResult['assets']) {
  if (!imgs?.length) {
    return []
  }

  const data = new FormData()
  for (const img of imgs) {
    // TODO solve any type
    data.append('upload[]', {
      uri: img.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any)
  }

  return request<string[]>({
    baseURL: Config.request.imgBaseURL,
    method: 'POST',
    url: '/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}

export function PostHoleCommentReplyRequest(data: {
  commentId: string
  body: string
  replyId?: string
}) {
  return request({
    method: 'POST',
    url: '/post/comment/reply',
    data,
  })
}

export function GetHoleReplyRequest(
  params: PaginateAble<{
    id: string
    replyId?: string
  }>,
) {
  return request<IHoleReplyListResponse>({
    method: 'GET',
    url: '/post/comment/replies',
    params,
  })
}

export function LikeReplyRequest(data: { id: string }) {
  return request({
    method: 'POST',
    url: '/post/comment/reply/like',
    data,
  })
}

export function DeleteReplyLikeRequest(data: { id: string }) {
  return request({
    method: 'DELETE',
    url: '/post/comment/reply/like',
    data,
  })
}

export function LikeCommentRequest(data: { id: string }) {
  return request({
    method: 'POST',
    url: '/post/comment/like',
    data,
  })
}

export function DeleteCommentLikeRequest(data: { id: string }) {
  return request({
    method: 'DELETE',
    url: '/post/comment/like',
    data,
  })
}

export function PostHoleVoteRequest(data: { ids: string[] } & IdAble) {
  return request({
    method: 'POST',
    url: '/post/vote',
    data,
  })
}

export function GetHoleCategoryRequest(params: {
  category: HoleClassification
  subCategory: string
}) {
  return request({
    method: 'GET',
    url: '/post/category',
    params,
  })
}

export function GetHoleCategoryList() {
  return request<ICategoryListResponse>({
    method: 'GET',
    url: '/post/categories',
  })
}

export function getHomeFollowList(params: PaginateAble) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/post/list/follow',
    params,
  })
}
