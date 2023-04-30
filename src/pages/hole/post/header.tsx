import { useMutation } from 'react-query'
import { PostHoleValidator } from '@/shared/validators/hole'
import { PostHoleRequest, UploadHoleImgRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useHolePostContext } from '@/shared/context/hole'
import { BackAndButtonHeader } from '@/components/header/BackAndButtonHeader'
import { useNavigation } from '@react-navigation/native'

export function HolePostHeader() {
  const navigation = useNavigation()

  const {
    form: { handleSubmit },
    imgs,
  } = useHolePostContext()

  const mutation = useMutation({
    mutationFn: (data: PostHoleValidator) => PostHoleRequest(data),
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: (data.msg as string) || '成功发布树洞',
      })
      navigation.goBack()
    },
  })

  const onSubmit = async (data: PostHoleValidator) => {
    const result = await UploadHoleImgRequest(imgs)

    console.log(data)
    mutation.mutate({
      ...data,
      imgs: result,
    })
  }

  return (
    <BackAndButtonHeader
      onPress={handleSubmit(onSubmit)}
      loading={mutation.isLoading}
      submitText={'发布'}
    />
  )
}
