import { AwaitFunc } from '@/shared/types'
import { AxiosError } from 'axios'
import type { FieldValues, UseFormSetError } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useLinkTo } from '@react-navigation/native'
import { getQAQFont } from '@/shared/utils/utils'
import { useAuth } from '@/shared/hooks/useAuth'

interface Options<T extends FieldValues> {
  reqFunc: AwaitFunc<T>
  setError: UseFormSetError<T & { reqFailedError: string }>
}

export function useAuthMutation<T extends FieldValues>(options: Options<T>) {
  const linkTo = useLinkTo()
  const { login } = useAuth()

  const mutation = useMutation({
    mutationFn: (data: T) => {
      return options.reqFunc(data)
    },
    onError(error: AxiosError) {
      if (error.code) {
        options.setError('reqFailedError' as any, {
          message:
            (error?.response?.data as any)?.msg ||
            `网络连接失败，可能是服务器炸了${getQAQFont('sadness')}`,
        })
      }
    },
    onSuccess(data) {
      login(data.data.token)
      linkTo('/index')
    },
    retry: false,
  })

  return mutation
}
