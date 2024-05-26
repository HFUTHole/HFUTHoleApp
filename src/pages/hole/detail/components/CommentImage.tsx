import React from 'react'
import { Image } from '@/components/image/Image'
import { Portal } from 'react-native-paper'
import { useBoolean } from 'ahooks'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from '@/components/icon'
import { IconButton } from '@/components/IconButton'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { AnimatedLikeButton } from '@/components/animation/LikeButton'
import { If } from 'react-if'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'

interface CommentImageProps {
  data: IHoleCommentListItem | IHoleReplyListItem
}

export const CommentImage: React.FC<CommentImageProps> = (props) => {
  const { data } = props

  const [visible, visibleActions] = useBoolean(false)

  const uri = data.imgs[0]

  return (
    <>
      <Portal>
        {visible && (
          <Pressable
            className={'flex-1'}
            onPress={() => {
              visibleActions.toggle()
            }}
          >
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              className={'flex-1 justify-center'}
            >
              <SafeAreaView className={'flex-1 bg-black'}>
                <SafeAreaView className={'absolute left-0 z-[1]'}>
                  <IconButton
                    icon={() => <ArrowLeftIcon color={'#fff'} />}
                    onPress={() => {
                      visibleActions.setFalse()
                    }}
                  />
                </SafeAreaView>
                <ReactNativeZoomableView
                  maxZoom={30}
                  minZoom={0.5}
                  zoomStep={0.5}
                  initialZoom={1}
                  bindToBorders={true}
                >
                  <Image
                    className={'w-full h-[80vh] bg-black'}
                    source={{ uri }}
                    resizeMode={'contain'}
                  />
                </ReactNativeZoomableView>
                <View className={'px-[2.5vw] flex-row'}>
                  <View className={'flex-row items-center'}>
                    <Text className={'text-white text-base'}>
                      <EmojiableText
                        textStyle={{
                          color: '#fff',
                          fontSize: 16,
                          textAlign: 'center',
                        }}
                        body={`@${data.user.username}：${data.body}`}
                      />
                    </Text>
                  </View>
                </View>
              </SafeAreaView>
            </Animated.View>
          </Pressable>
        )}
      </Portal>
      <If condition={!!data?.imgs?.length}>
        <Pressable onPress={visibleActions.toggle}>
          <Image className={'w-32 h-32 rounded-lg'} source={{ uri }} />
        </Pressable>
      </If>
    </>
  )
}
