import { View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { Link } from '@/components/link'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { AuthView } from '@/pages/auth/AuthView'
import { LoginFormValidator } from '@/pages/auth/validator'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { useDebounceFn } from 'ahooks'
import { useMutation } from 'react-query'
import { LoginRequest } from '@/request/apis/auth'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Snackbar } from '@/components/snackbar/snackbar'
import { Button } from '@/components/button'
import { useLinkTo } from '@react-navigation/native'

const LoginForm = () => {
  const [snackbarError, setSnackbarError] = useState<string | null>(null)

  const linkTo = useLinkTo()

  const { control, handleSubmit } = useForm<LoginFormValidator>({
    resolver: classValidatorResolver(LoginFormValidator),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: (data: LoginFormValidator) => LoginRequest(data),
    onError(error: AxiosError) {
      if (error.code) {
        setSnackbarError((error?.response?.data as any)?.msg)
      }
    },
    onSuccess() {
      linkTo('/home/index')
    },
  })

  const { run: onSubmit } = useDebounceFn(
    (data: LoginFormValidator) => {
      setSnackbarError(null)
      console.log(data)
      mutation.mutate({
        ...data,
        studentId: +data.studentId,
      })
    },
    { wait: 300 }
  )

  return (
    <View className={'grid space-y-3'}>
      {snackbarError && (
        <View className={'py-3'}>
          <Snackbar text={snackbarError} icon={'info'} error />
        </View>
      )}

      <Input<LoginFormValidator>
        control={control}
        name={'studentId'}
        label={'学号'}
      />

      <PasswordInput<LoginFormValidator>
        control={control}
        name={'password'}
        label={'密码'}
      />

      <View className={'flex flex-row justify-between items-center'}>
        <Checkbox status={'checked'} />
        <Link size={'xs'} to={'/'}>
          忘记密码？点我找回
        </Link>
      </View>

      <View>
        <Button
          mode={'contained'}
          className={`p-1 rounded-lg shadow-none w-full`}
          onPress={handleSubmit(onSubmit)}
          loading={mutation.isLoading}
        >
          登录
        </Button>
      </View>

      <View className={'pt-10'}>
        <Link size={'normal'} to={'register'}>
          还没有账号？点我注册
        </Link>
      </View>
    </View>
  )
}

export function Login() {
  return (
    <AuthView
      title={'登录HFUTHole'}
      secondary={'请输入你的账号密码'}
      snackbar={
        '第一次登录时并不需要注册，若无账号则直接输入好学号以及预设密码点击登录即可，也可点击下方的注册文字前往注册页面'
      }
    >
      <LoginForm />
    </AuthView>
  )
}
