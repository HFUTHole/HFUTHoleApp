import { AuthView } from '@/pages/auth/AuthView'
import { View } from 'react-native'
import { ForgetFormValidator } from '@/shared/validators/auth'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { Button } from 'react-native-paper'
import { ForgetRequest } from '@/request/apis/auth'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useAuthMutation } from './utils'
import { ForgetOnePassword } from '@/pages/auth/ForgetOnePassword'

const ForgetForm = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<ForgetFormValidator>({
    resolver: classValidatorResolver(ForgetFormValidator),
    mode: 'onChange',
  })

  const mutation = useAuthMutation({
    reqFunc: ForgetRequest,
    setError,
  })

  const onSubmit = useDebounce((data: ForgetFormValidator) => {
    mutation.mutate({
      ...data,
      studentId: +data.studentId,
    })
  })

  return (
    <View className={'grid space-y-2'}>
      <View>
        <Input<ForgetFormValidator>
          control={control}
          name={'studentId'}
          label={'学号'}
        />
      </View>

      <View>
        <PasswordInput<ForgetFormValidator>
          control={control}
          name={'password'}
          label={'密码'}
        />
      </View>

      <View>
        <PasswordInput<ForgetFormValidator>
          control={control}
          name={'hfutPassword'}
          label={'请输入信息门户密码'}
        />
      </View>

      <View>
        <ForgetOnePassword />
      </View>

      <View>
        <Button
          mode={'contained'}
          className={'shadow-none w-full'}
          onPress={handleSubmit(onSubmit)}
          loading={mutation.isLoading}
        >
          重置密码
        </Button>
      </View>
    </View>
  )
}

export function Forget() {
  return (
    <AuthView
      title={'找回密码HFUTHole'}
      secondary={'请输入你的账号密码'}
      snackbar={'需要通过验证信息门户来重置密码'}
    >
      <ForgetForm />
    </AuthView>
  )
}
