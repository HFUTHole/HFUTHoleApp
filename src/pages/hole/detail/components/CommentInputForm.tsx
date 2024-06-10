import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { CameraIcon, EmojiIcon } from '@/components/icon'
import { NativeInput } from '@/components/form/NativeInput'
import { EmojiItem, EmojiList } from '@/assets/emoji'
import { EmojiArea } from '@/components/emoji/EmojiArea'
import React, { useState } from 'react'
import { Button } from '@/components/button'
import { hideKeyboard } from '@/shared/utils/keyboard'
import { useMutation } from 'react-query'
import { UploadHoleImgRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useSelectImage } from '@/shared/hooks/useSelectImage'
import { FormImage } from '@/components/form/FormImage'
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { AvoidingKeyboardVisible } from '@/components/keyboard/AvoidingKeyboardVisible'
import { useUserProfile } from '@/swr/user/profile'

interface Props {
  onCommentSuccess: () => void
  id: number
}

export function CommentInputForm(props: Props) {
  const { showInput, closeInput } = useBottomCommentContext()
  const { data: userData } = useUserProfile()
  const {
    form: {
      setValue,
      getValues,
      control,
      formState: { isDirty },
      handleSubmit,
    },
    isReply,
    data,
    reqFunc,
  } = useBottomCommentContext()

  const [showEmojiArea, setShowEmojiArea] = useState(false)

  const mutation = useMutation({
    mutationFn: reqFunc,
    onSuccess(response: { incExperience: number }, vars) {
      Toast.show({
        type: 'success',
        text1: '留言成功哦',
        text2: `经验+${response.incExperience}`,
      })
      hideKeyboard()
      props.onCommentSuccess()
    },
  })

  const onEmojiSelect = (emoji: EmojiItem) => {
    setValue('body', `${getValues('body') || ''}${emoji.name}`, {
      shouldDirty: true,
    })
  }

  const toggleEmojiArea = () => {
    setShowEmojiArea((prev) => {
      return !prev
    })
  }

  const { onSelectImage, imgs, setImgs } = useSelectImage({
    selectionLimit: 2,
  })

  const onSubmit = async (data: { body: string }) => {
    const result = await UploadHoleImgRequest(imgs)
    mutation.mutate({
      body: data.body,
      imgs: result,
      id: props.id,
    })
  }

  return (
    <>
      <AvoidingKeyboardVisible>
        <View
          className={
            'absolute bottom-0 border-t-[1px] border-t-black/5 bg-white'
          }
        >
          <View
            className={
              'p-2 flex flex-row items-center justify-between space-x-2'
            }
          >
            <View className={'px-2 flex-1 bg-[#F3F3F3] rounded-2xl'}>
              <View className={'px-2 pt-2'}>
                {showInput && (
                  <NativeInput
                    control={control}
                    name={'body'}
                    multiline={true}
                    autoFocus={true}
                    style={{
                      maxHeight: 16 * 4,
                    }}
                    onFocus={() => setShowEmojiArea(false)}
                    placeholder={
                      isReply ? `回复 ${data!.user!.username}：` : '发个评论吧~'
                    }
                  />
                )}
              </View>
              <View
                className={
                  'flex flex-row space-x-2 justify-between items-center py-2'
                }
              >
                <IconButton
                  icon={() => <CameraIcon size={24} />}
                  onPress={onSelectImage}
                />
                <FormImage
                  imgs={imgs}
                  onCloseable={(index) =>
                    setImgs((draft) => {
                      draft!.splice(index, 1)
                    })
                  }
                />
                <View className={'flex flex-row space-x-4'}>
                  {/*<AtIcon size={24} />*/}
                  <IconButton
                    icon={() => <EmojiIcon size={24} />}
                    onPress={toggleEmojiArea}
                  />
                </View>
              </View>
            </View>
            <Button
              mode={'contained'}
              onPress={handleSubmit(onSubmit)}
              loading={mutation.isLoading}
            >
              发送
            </Button>
          </View>
          <View className={'py-2'}>
            <EmojiArea
              onEmojiSelect={onEmojiSelect}
              expandArea={showEmojiArea}
            />
          </View>
        </View>
      </AvoidingKeyboardVisible>
    </>
  )
}
