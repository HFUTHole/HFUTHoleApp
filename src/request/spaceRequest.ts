import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { Config } from '@/shared/config'
import { getQAQFont, packStorageToken } from '@/shared/utils/utils'
import Toast from 'react-native-toast-message'

const headers = {
  'User-Agent': 'wechatdevtools/1.05.2204250 MicroMessenger/8.0.5',
}

const instance = axios.create({
  baseURL: Config.request.spaceBaseURL,
  timeout: Config.request.timeout,
  headers,
})

instance.interceptors.response.use(
  (res) => {
    if (res.data.data) {
      return res.data.data
    } else {
      return res.data
    }
  },
  (error: AxiosError) => {
    const msg = (error?.response?.data as IMutationResponse)?.msg
    Toast.show({
      type: 'error',
      text1: `请求失败了${getQAQFont('sadness')}`,
      text2: !msg ? '可能是服务器炸了，去问问管理员吧' : (msg as string),
    })
    throw error
  }
)

export function request<T = any>(config: AxiosRequestConfig) {
  return instance<T>({
    method: 'GET',
    ...config,
    headers: {
      authorization: packStorageToken(true),
      ...config.headers,
    },
  }) as Promise<T>
}
