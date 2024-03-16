import { Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { Link } from '@/components/link'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { AuthView } from '@/pages/auth/AuthView'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { LoginRequest } from '@/request/apis/auth'
import { Snackbar } from '@/components/snackbar/snackbar'
import { Button } from '@/components/button'
import { LoginFormValidator } from '@/shared/validators/auth'
import { useAuthMutation } from './utils'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { NativeInput, NativeTextInput } from '@/components/form/NativeInput'

const LoginForm = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<LoginFormValidator>({
    resolver: classValidatorResolver(LoginFormValidator),
    mode: 'onChange',
  })

  const mutation = useAuthMutation<LoginFormValidator>({
    reqFunc: LoginRequest,
    setError,
  })

  const onSubmit = useDebounce((data: LoginFormValidator) => {
    mutation.mutate({
      ...data,
      studentId: +data.studentId,
    })
  })

  return (
    <View className={'grid space-y-3'}>
      {errors?.reqFailedError && (
        <View className={'py-3'}>
          <Snackbar
            text={errors.reqFailedError?.message || '出错了'}
            icon={'info'}
            error
          />
        </View>
      )}

      <View>
        <NativeTextInput
          control={control}
          name={'studentId'}
          placeholder={'学号'}
        />
      </View>

      <View>
        <PasswordInput<LoginFormValidator>
          control={control}
          name={'password'}
          placeholder={'密码'}
        />
      </View>

      <View className={'flex flex-row justify-between items-center'}></View>

      <View className={'mt-2 space-y-4'}>
        <Button
          mode={'contained'}
          className={`shadow-none w-full rounded-lg py-[2px]`}
          theme={{ version: 2, isV3: false }}
          onPress={handleSubmit(onSubmit)}
          loading={mutation.isLoading}
        >
          <Text className={'text-base'}>登录</Text>
        </Button>
        <View className={'flex-row justify-between'}>
          <Link size={'normal'} to={'forget'}>
            忘记密码？点我找回
          </Link>
          <Link size={'normal'} to={'register'}>
            还没有账号？点我注册
          </Link>
        </View>
      </View>
    </View>
  )
}

export function Login() {
  return (
    <AuthView title={'登录小肥书'} secondary={'请输入你的账号密码'}>
      <LoginForm />
    </AuthView>
  )
}
