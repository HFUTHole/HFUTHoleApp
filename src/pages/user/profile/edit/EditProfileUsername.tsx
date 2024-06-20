import { SecondaryText } from '@/components/Text/SecondaryText'
import { useUserProfile } from '@/swr/user/profile'
import { ProfileItemWithEventProps } from '@/pages/user/profile/edit/singal'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import { View } from 'react-native'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator'
import { EditProfileUsernameValidator } from '@/shared/validators/user/profile'
import { Button } from '@/components/button'
import { useMutation } from 'react-query'
import { PostUserProfileRequest } from '@/request/apis/user'
import { NativeInput } from '@/components/form/NativeInput'
import { Toast } from '@/shared/utils/toast'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'

export function EditProfileUsername({ event }: ProfileItemWithEventProps) {
  const { data } = useUserProfile()

  const route = useUserProfileRoute()

  event.useSubscription(
    (type) => type === 'username' && route.goEditUsernameScreen(),
  )

  return <SecondaryText>{data!.username}</SecondaryText>
}

export function EditUsernameScreen() {
  const { data } = useUserProfile()
  const { refetch } = useUserProfile()
  const navigation = useNavigation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileUsernameValidator>({
    resolver: classValidatorResolver(EditProfileUsernameValidator),
    defaultValues: {
      username: data?.username,
    },
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: (data: EditProfileUsernameValidator) =>
      PostUserProfileRequest(data),
    onSuccess() {
      Toast.success({
        text1: '修改名字成功！',
      })

      refetch()

      navigation.goBack()
    },
  })

  const onSubmit: SubmitHandler<EditProfileUsernameValidator> = (data) => {
    mutation.mutate(data)
  }

  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <BackHeader title={'修改名字'} />
      <View
        className={'flex-row space-x-2 justify-between items-center px-[2.5vw]'}
      >
        <View className={'flex-1'}>
          <Input
            name={'username'}
            placeholder={'请输入你想修改的名字'}
            control={control}
            mode={'flat'}
            transparent
            autoFocus
          />
        </View>
        <View>
          <Button
            loading={mutation.isLoading}
            onPress={handleSubmit(onSubmit)}
            mode={'contained'}
          >
            修改
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
