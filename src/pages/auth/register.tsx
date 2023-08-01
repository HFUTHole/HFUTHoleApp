import { Pressable, View } from 'react-native'
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
        <Input<RegisterFormValidator>
          control={control}
          name={'username'}
          label={'取一个好听的名字吧≖‿≖✧'}
        />
      </View>
      <View>
        <Input<RegisterFormValidator>
          control={control}
          name={'studentId'}
          label={'学号'}
        />
      </View>

      <View>
        <PasswordInput<RegisterFormValidator>
          control={control}
          name={'password'}
          label={'密码'}
        />
      </View>

      <View>
        <PasswordInput<RegisterFormValidator>
          control={control}
          name={'hfutPassword'}
          label={'请输入信息门户密码'}
        />
      </View>

      <View>
        <ForgetOnePassword />
      </View>

      <View className={'mt-2'}>
        <Button
          mode={'contained'}
          className={'shadow-none w-full'}
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
    <AuthView
      title={'注册HFUTHole'}
      secondary={'请输入你的账号密码'}
      snackbar={[
        '注册之前需要绑定一下你的信息门户账号来证明你是工大学子哦',
        '新生学号可以去官网录取结果通知那里查询，信息门户密码默认为身份证后六位',
      ]}
    >
      <RegisterForm />
    </AuthView>
  )
}
