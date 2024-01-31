import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import { Config } from '@/shared/config'
import { getQAQFont, packStorageToken } from '@/shared/utils/utils'
import Toast from 'react-native-toast-message'
import { store } from '@/store/store'
import { logout } from '@/store/reducer/user'

const instance = axios.create({
  baseURL: Config.request.baseURL,
})

instance.interceptors.response.use(
  (data) => {
    if (data.data.data) {
      return data.data.data
    } else {
      return data.data
    }
  },
  (error: AxiosError) => {
    const msg = (error?.response?.data as IMutationResponse)?.msg

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      store.dispatch(logout())
    }

    Toast.show({
      type: 'error',
      text1: `请求失败了${getQAQFont('sadness')}`,
      text2: !msg
        ? '可能是服务器炸了，去问问管理员吧'
        : Array.isArray(msg)
          ? msg.map((i) => `${i}`).join('\n')
          : msg,
    })

    throw error
  },
)

export function request<T = any>(config: AxiosRequestConfig) {
  return instance<T>({
    method: 'GET',
    ...config,
    headers: {
      authorization: packStorageToken(),
      ...config.headers,
    },
  }) as Promise<T>
}
