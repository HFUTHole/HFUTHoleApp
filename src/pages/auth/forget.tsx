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
import { NativeInput, NativeTextInput } from '@/components/form/NativeInput'
import React from 'react'
import { Snackbar } from '@/components/snackbar/snackbar'

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
        <NativeTextInput<ForgetFormValidator>
          control={control}
          name={'studentId'}
          placeholder={'学号'}
        />
      </View>

      <View>
        <PasswordInput<ForgetFormValidator>
          control={control}
          name={'password'}
          placeholder={'密码'}
        />
      </View>

      <View>
        <PasswordInput<ForgetFormValidator>
          control={control}
          name={'hfutPassword'}
          placeholder={'请输入信息门户密码'}
        />
      </View>

      <View>
        <ForgetOnePassword />
      </View>

      <View>
        <Button
          mode={'contained'}
          className={`shadow-none w-full rounded-lg py-[2px]`}
          theme={{ version: 2, isV3: false }}
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
    <AuthView title={'找回小肥书密码'} secondary={'需要信息门户密码作为校验'}>
      <ForgetForm />
    </AuthView>
  )
}
