import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { CommentInputForm } from '@/pages/hole/detail/components/CommentInputForm'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// export function CommentMaskModal() {
//   const { showInput, closeInput } = useBottomCommentContext()
//   const route = useRoute()
//   const { id } = route.params as { id: number }
//
//   const renderTouchable = () => {
//     if (Platform.OS === 'ios') {
//       return (
//         <TouchableOpacity onPress={() => closeInput(true)}>
//           <View className="opacity-0 h-full"></View>
//         </TouchableOpacity>
//       )
//     }
//   }
//   return (
//     <>
//       <Modal
//         isOpen={showInput}
//         onClose={() => closeInput()}
//         animationPreset={'slide'}
//       >
//         <View className={'absolute left-0 right-0 top-0 bottom-0'}>
//           {renderTouchable()}
//           <CommentInputForm onCommentSuccess={() => closeInput(true)} id={id} />
//         </View>
//       </Modal>
//     </>
//   )
// }

import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { NativeInput } from '@/components/form/NativeInput'
import { AtIcon, CameraIcon, EmojiIcon } from '@/components/icon'
import { FormImage } from '@/components/form/FormImage'
import { useSelectImage } from '@/shared/hooks/useSelectImage'
import { useBoolean } from 'ahooks'
import { EmojiArea } from '@/components/emoji/EmojiArea'
import { EmojiItem } from '@/assets/emoji'
import { Button } from '@/components/button'
import { useMutation } from 'react-query'
import Toast from 'react-native-toast-message'
import { hideKeyboard } from '@/shared/utils/keyboard'
import { UploadHoleImgRequest } from '@/request/apis/hole'
import { Portal } from 'react-native-paper'
import { If, Then } from 'react-if'

export function CommentMaskModal() {
  const route = useRoute()
  const { id } = route.params as { id: number }
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
    closeInput,
    showInput,
  } = useBottomCommentContext()

  const mutation = useMutation({
    mutationFn: reqFunc,
    onSuccess(response: { incExperience: number }, vars) {
      Toast.show({
        type: 'success',
        text1: '留言成功哦',
        text2: `经验+${response.incExperience}`,
      })
      hideKeyboard()
      closeInput(true)
    },
  })

  const [showEmojiArea, emojiAreaActions] = useBoolean(false)
  const { onSelectImage, imgs, setImgs } = useSelectImage({
    selectionLimit: 2,
  })

  const onEmojiSelect = (emoji: EmojiItem) => {
    setValue('body', `${getValues('body') || ''}${emoji.name}`, {
      shouldDirty: true,
    })
  }

  const onSubmit = async (data: { body: string }) => {
    const result = await UploadHoleImgRequest(imgs)
    mutation.mutate({
      body: data.body,
      imgs: result,
      id: id,
    })
  }

  return (
    <Portal>
      <If condition={showInput}>
        <Then>
          <KeyboardAvoidingView
            className={'flex-1 flex-row z-[2] items-end'}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Pressable
              className={'absolute flex-1 left-0 right-0 top-0 bottom-0 z-[1]'}
              onPress={() => {
                closeInput()
              }}
            >
              <Animated.View
                entering={SlideInDown}
                exiting={SlideOutDown}
                className={'flex-1 bg-black/50'}
              />
            </Pressable>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className={'flex-1 flex-row z-[2]'}>
                <View className={'bg-white'}>
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
                              minHeight: 16 * 2,
                              maxHeight: 16 * 4,
                              fontSize: 14,
                            }}
                            onFocus={emojiAreaActions.setFalse}
                            placeholder={
                              isReply
                                ? `回复 ${data!.user!.username}：`
                                : '你若安不好，屁股给你拍八瓣'
                            }
                          />
                        )}
                        <View
                          className={
                            'flex flex-row space-x-2 justify-between items-center py-2'
                          }
                        >
                          <FormImage
                            imgs={imgs}
                            onCloseable={(index) =>
                              setImgs((draft) => {
                                draft!.splice(index, 1)
                              })
                            }
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
                  <View className={'pt-2'}>
                    <View className={'flex flex-row space-x-6 pb-2 px-4'}>
                      <TouchableOpacity onPress={onSelectImage}>
                        <CameraIcon size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <AtIcon size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={emojiAreaActions.toggle}>
                        <EmojiIcon size={20} />
                      </TouchableOpacity>
                    </View>
                    <View className={'py-2 border-t-[1px] border-t-black/10'}>
                      <EmojiArea
                        onEmojiSelect={onEmojiSelect}
                        expandArea={showEmojiArea}
                        emojiSize={22}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Then>
      </If>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    bottom: 0,
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
})
