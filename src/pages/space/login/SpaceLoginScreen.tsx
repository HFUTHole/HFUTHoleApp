import { AuthView } from '@/pages/auth/AuthView'
import { View } from 'react-native'
import { Snackbar } from '@/components/snackbar/snackbar'
import { Input } from '@/components/form/Input'
import { LoginFormValidator } from '@/shared/validators/space/auth'
import { PasswordInput } from '@/components/form/PasswordInput'
import { Button } from '@/components/button'
import { useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useMutation } from 'react-query'
import { LoginRequest } from '@/request/space/auth'
import { AxiosError } from 'axios'
import { getQAQFont } from '@/shared/utils/utils'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { ForgetOnePassword } from '@/pages/auth/ForgetOnePassword'

export function SpaceLoginScreen() {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<LoginFormValidator>({
    resolver: classValidatorResolver(LoginFormValidator),
    mode: 'onChange',
  })

  const { login } = useAuth()

  const mutation = useMutation({
    retry: false,
    mutationFn: (data: LoginFormValidator) => LoginRequest(data),
    onError(error: AxiosError) {
      if (error.code) {
        setError('reqFailedError', {
          message:
            (error?.response?.data as any)?.msg ||
            `网络连接失败，可能是服务器炸了${getQAQFont('sadness')}`,
        })
      }
    },
    onSuccess(data) {
      login(data.token)
    },
  })

  const onSubmit = useDebounce((data: LoginFormValidator) => {
    mutation.mutate({
      ...data,
      studentId: +data.studentId,
    })
  })

  return (
    <AuthView
      title={'HFUTSpace'}
      secondary={'欢迎登录HFUTSpace'}
      snackbar={[
        '登录HFUTSpace可以查看到课表，成绩，排名哦',
        '输错太多次密码教务系统会冻结账号五分钟',
      ]}
      image={require('@/assets/img/space.png')}
    >
      <View className={'grid space-y-3'}>
        {errors?.reqFailedError && (
          <View className={'py-3'}>
            <Snackbar
              text={
                errors.reqFailedError?.message || '服务器出错啦，去问问管理员吧'
              }
              icon={'info'}
              error
            />
          </View>
        )}

        <View>
          <Input<LoginFormValidator>
            control={control}
            name={'studentId'}
            label={'学号'}
          />
        </View>

        <View>
          <PasswordInput<LoginFormValidator>
            control={control}
            name={'password'}
            label={'请输入信息门户密码'}
          />
        </View>

        <View>
          <ForgetOnePassword />
        </View>

        <View className={'mt-2'}>
          <Button
            mode={'contained'}
            className={`shadow-none w-full`}
            onPress={handleSubmit(onSubmit)}
            loading={mutation.isLoading}
          >
            登录
          </Button>
        </View>
      </View>
    </AuthView>
  )
}
