import { useBottomCommentContext } from '@/shared/context/hole/comment'
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
  FadeIn,
  FadeOut,
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
import { useHoleComment } from '@/swr/hole'
import { useCommentEventBusContext } from '@/shared/context/comment/eventBus'
import { Apis } from '@/request/apis'
import { useCommentReplies } from '@/swr/hole/reply'

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

  const { scrollEvent, addReplyEvent } = useCommentEventBusContext()

  const { addComments } = useHoleComment()

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
      if (!data?.commentId && !data?.replyId) {
        addComments([response as any])
        scrollEvent.emit(0)
      } else if (data?.commentId) {
        //TODO 回复评论
        addReplyEvent.emit({
          commentId: data.commentId,
          parentReplyId: data.replyId,
          data: response as any,
        })
      }
    },
  })

  const [showEmojiArea, emojiAreaActions] = useBoolean(false)
  const { onSelectImage, imgs, setImgs } = useSelectImage({
    selectionLimit: 2,
  })

  // 光标选择位置
  const [cursor, setCursor] = useState({ start: 0, end: 0 })
  // 是否在将 cursor 位置更新到输入框
  const [shouldUpdateCursor, setShouldUpdateCursor] = useState(false)

  const onEmojiSelect = (emoji: EmojiItem) => {
    // setValue('body', `${getValues('body') || ''}${emoji.name}`, {
    //   shouldDirty: true,
    // })
    const body = getValues('body') || ''
    setValue(
      'body',
      `${body.slice(0, cursor.start)}${emoji.name}${body.slice(cursor.end)}`,
      {
        shouldDirty: true,
      },
    )
    setCursor({
      start: cursor.start + emoji.name.length,
      end: cursor.start + emoji.name.length,
    })
    setShouldUpdateCursor(true)
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
                entering={FadeIn}
                exiting={FadeOut}
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
                            selection={shouldUpdateCursor ? cursor : undefined}
                            onSelectionChange={(e) => {
                              if (shouldUpdateCursor) {
                                setShouldUpdateCursor(false)
                              } else {
                                setCursor(e.nativeEvent.selection)
                              }
                            }}
                            style={{
                              minHeight: 16 * 2,
                              maxHeight: 16 * 4,
                              fontSize: 14,
                            }}
                            onFocus={emojiAreaActions.setFalse}
                            placeholder={
                              isReply
                                ? `回复 ${data!.user!.username}：`
                                : '发个评论吧~'
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
                        emojiSize={25}
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
