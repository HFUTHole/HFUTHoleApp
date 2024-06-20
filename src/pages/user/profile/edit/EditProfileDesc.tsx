import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { useUserProfile } from '@/swr/user/profile'
import { View } from 'react-native'
import { NativeInput } from '@/components/form/NativeInput'
import { Button } from '@/components/button'
import { useForm } from 'react-hook-form'
import {
  EditProfileDescValidator,
  EditProfileUsernameValidator,
} from '@/shared/validators/user/profile'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ScreenHeight } from '@/shared/utils/utils'
import { useMutation } from 'react-query'
import { PostUserProfileRequest } from '@/request/apis/user'
import { Toast } from '@/shared/utils/toast'
import { useNavigation } from '@react-navigation/native'

export const EditProfileDesc: React.FC = () => {
  const navigation = useNavigation()
  const { data, refetch } = useUserProfile()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileDescValidator>({
    defaultValues: {
      desc: data?.desc || '',
    },
    resolver: classValidatorResolver(EditProfileDescValidator),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: (data: EditProfileDescValidator) =>
      PostUserProfileRequest(data),
    onSuccess() {
      Toast.success({
        text1: '修改名字成功！',
      })

      refetch()

      navigation.goBack()
    },
  })

  const onSubmit = (data: EditProfileDescValidator) => {
    mutation.mutate(data)
  }

  return (
    <SafeAreaView className={'flex-1 bg-white px-[2.5vw]'}>
      <BackHeader
        title={data?.username + '个性签名'}
        rightChild={
          <Button
            loading={mutation.isLoading}
            mode={'text'}
            onPress={handleSubmit(onSubmit)}
          >
            保存
          </Button>
        }
      />
      <View>
        <View className={'py-2 border-b-[1px] border-b-black/10'}>
          <NativeInput
            numberOfLines={5}
            multiline={true}
            style={{
              height: ScreenHeight * 0.25,
              textAlignVertical: 'top',
            }}
            name={'desc'}
            control={control}
            placeholder={'请输入个性签名'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
