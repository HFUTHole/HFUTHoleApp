import { KeyboardAvoidingView, Pressable, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { AuthView } from '@/pages/auth/AuthView'
import { RegisterRequest } from '@/request/apis/auth'
import { RegisterFormValidator } from '@/shared/validators/auth'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Snackbar } from '@/components/snackbar/snackbar'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useAuthMutation } from './utils'
import { ForgetOnePassword } from '@/pages/auth/ForgetOnePassword'
import { NativeInput, NativeTextInput } from '@/components/form/NativeInput'

const RegisterForm = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<RegisterFormValidator>({
    resolver: classValidatorResolver(RegisterFormValidator),
    mode: 'onChange',
  })

  const mutation = useAuthMutation<RegisterFormValidator>({
    reqFunc: RegisterRequest,
    setError,
  })

  const onSubmit = useDebounce((data: RegisterFormValidator) => {
    mutation.mutate({
      ...data,
      studentId: +data.studentId,
    })
  })

  return (
    <View className={'grid space-y-2'}>
      {errors?.reqFailedError && (
        <View className={'py-3'}>
          <Snackbar
            text={errors.reqFailedError?.message || '出错啦'}
            icon={'info'}
            error
          />
        </View>
      )}
      <View>
        <NativeTextInput<RegisterFormValidator>
          control={control}
          name={'username'}
          placeholder={'用户名'}
        />
      </View>
      <View>
        <NativeTextInput<RegisterFormValidator>
          control={control}
          name={'studentId'}
          placeholder={'学号'}
        />
      </View>

      <View>
        <PasswordInput<RegisterFormValidator>
          control={control}
          name={'password'}
          placeholder={'密码'}
        />
      </View>

      <View>
        <PasswordInput<RegisterFormValidator>
          control={control}
          name={'hfutPassword'}
          placeholder={'信息门户密码'}
        />
      </View>

      <View>
        <ForgetOnePassword />
      </View>

      <View className={'mt-2'}>
        <Button
          mode={'contained'}
          className={`shadow-none w-full rounded-lg py-[2px]`}
          theme={{ version: 2, isV3: false }}
          onPress={handleSubmit(onSubmit)}
          loading={mutation.isLoading}
        >
          注册
        </Button>
      </View>
    </View>
  )
}

export function Register() {
  return (
    <AuthView title={'注册小肥书'} secondary={'请输入你的账号密码'}>
      <RegisterForm />
    </AuthView>
  )
}
