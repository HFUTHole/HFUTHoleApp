import React from 'react'
import { Portal } from 'react-native-paper'
import { KeyboardAvoidingView, Pressable, View } from 'react-native'
import { NativeInput } from '@/components/form/NativeInput'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { App } from '@/shared/utils/App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { If, Then } from 'react-if'
import { useGoodsCommentsQuery } from '@/swr/market/comment'
import { useMutation } from 'react-query'
import Toast from 'react-native-toast-message'
import { hideKeyboard } from '@/shared/utils/keyboard'
import { useParams } from '@/shared/hooks/useParams'
import { useCommentEventBusContext } from '@/shared/context/comment/eventBus'

interface UsedGoodsDetailCommentInputProps {}

export const UsedGoodsDetailCommentInput: React.FC<
  UsedGoodsDetailCommentInputProps
> = () => {
  const params = useParams<{ id: string }>()
  const {
    form: {
      control,
      formState: { errors },
      handleSubmit,
    },
    showInput,
    closeInput,
    reqFunc,
    data,
  } = useBottomCommentContext()

  const { addComments } = useGoodsCommentsQuery()
  const { addReplyEvent } = useCommentEventBusContext()

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
      } else if (data?.commentId) {
        addReplyEvent.emit({
          commentId: data.commentId,
          parentReplyId: data.replyId,
          data: response as any,
        })
      }
    },
  })

  const onSubmit = async (data: { body: string }) => {
    mutation.mutate({
      body: data.body,
      id: params.id,
    })
  }

  return (
    <Portal>
      <If condition={showInput}>
        <Then>
          <Animated.View
            className={'flex-1'}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <SafeAreaView className={'flex-1'} edges={['bottom']}>
              <KeyboardAvoidingView
                className={'flex-1 justify-end'}
                behavior={App.keyboardAvoidingBehavior}
              >
                <Pressable
                  className={'absolute w-screen h-screen bg-black/50 z-[2]'}
                  onPress={() => {
                    closeInput()
                  }}
                />
                <View className={'justify-end z-[3]'}>
                  <View
                    className={
                      'flex-row items-center z-[3] bg-white py-2 justify-between px-[2.5vw]'
                    }
                  >
                    <View className={'w-[75%] overflow-hidden'}>
                      <View
                        className={
                          'bg-[#efefef] px-[2.5vw] pb-3 pt-1 rounded-xl'
                        }
                      >
                        <NativeInput
                          name={'body'}
                          control={control}
                          placeholder={'给卖家留个言吧~'}
                          style={{
                            fontSize: 14,
                            maxHeight: 16 * 4,
                          }}
                          autoFocus={true}
                          multiline={true}
                        />
                      </View>
                    </View>
                    <View className={'flex-row space-x-1'}>
                      <Button
                        mode={'contained'}
                        className={'self-end'}
                        loading={mutation.isLoading}
                        onPress={handleSubmit(onSubmit)}
                      >
                        发送
                      </Button>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </SafeAreaView>
          </Animated.View>
        </Then>
      </If>
    </Portal>
  )
}
