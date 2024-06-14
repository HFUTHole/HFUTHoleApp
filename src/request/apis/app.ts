import { request } from '@/request/request'

export function getAppVersionRequest() {
  return request<{
    latest_version: string
    latest_url: string
  }>({
    method: 'GET',
    url: '/app/version',
  })
}
