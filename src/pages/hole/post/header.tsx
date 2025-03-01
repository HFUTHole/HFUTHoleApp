import { useMutation } from 'react-query'
import { PostHoleValidator } from '@/shared/validators/hole'
import { PostHoleRequest, UploadHoleImgRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useHolePostContext } from '@/shared/context/hole'
import { BackAndButtonHeader } from '@/components/header/BackAndButtonHeader'
import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'

export function HolePostHeader() {
  const navigation = useNavigation()

  const {
    form: { handleSubmit, resetField },
    imgs,
    votes,
    bilibili,
    tags,
    additionalTags,
  } = useHolePostContext()

  const mutation = useMutation({
    mutationFn: async (data: PostHoleValidator) => {
      try {
        const resultImage = await UploadHoleImgRequest(imgs)

        if (!data.title?.length) {
          delete data.title
        }

        return PostHoleRequest({
          ...data,
          bilibili,
          imgs: resultImage,
          tags: tags.concat(additionalTags),
          ...(votes.items.length > 0
            ? {
                vote: {
                  items: votes.items.map((i) => i.value),
                },
              }
            : ({} as any)),
        })
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: '上传图片失败了~',
        })
      }
    },
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: (data.msg as string) || '成功发布帖子',
        text2: `经验+${
          (data as unknown as { incExperience: number }).incExperience
        }`,
      })

      // 防止跳出去的时候激活Prevent Leave
      resetField('body')
      navigation.goBack()
    },
  })

  const onSubmit = async (data: PostHoleValidator) => {
    mutation.mutate(data)
  }

  return (
    <BackAndButtonHeader
      onPress={handleSubmit(onSubmit)}
      loading={mutation.isLoading}
      submitText={'发布'}
      buttonMode={'text'}
    />
  )
}
