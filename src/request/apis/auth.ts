import {
  LoginFormValidator,
  RegisterFormValidator,
  ForgetFormValidator,
} from '@/shared/validators/auth'
import axios, { AxiosRequestConfig } from 'axios/index'
import { Config } from '@/shared/config'

const instance = axios.create({
  baseURL: Config.request.baseURL,
})

instance.interceptors.response.use((data) => data.data)

function request<T = any>(config: AxiosRequestConfig) {
  return instance<T>({
    method: 'GET',
    ...config,
  }) as Promise<T>
}

export function LoginRequest(data: LoginFormValidator) {
  return request<IAuthResponse>({
    url: '/auth/login',
    method: 'POST',
    data,
  })
}

export function RegisterRequest(data: RegisterFormValidator) {
  return request<IAuthResponse>({
    url: '/auth/register',
    method: 'post',
    data,
  })
}

export function ForgetRequest(data: ForgetFormValidator) {
  return request<IAuthResponse>({
    url: '/auth/forget',
    method: 'post',
    data,
  })
}
