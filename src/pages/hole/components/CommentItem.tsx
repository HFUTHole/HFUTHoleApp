import { GestureResponderEvent, Text, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { TimeText } from '@/components/Text/Time'
import React, {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AwaitAble, Func, PartialExcludeField } from '@/shared/types'
import { useMutation, UseMutationResult } from 'react-query'
import { ReportType } from '@/shared/validators/report'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { AnimatedLikeButton } from '@/components/animation/LikeButton'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import {
  ReportAction,
  ReportActionProps,
} from '@/pages/hole/detail/components/ReportAction'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { CopyIcon, DangerIcon } from '@/components/icon'
import * as Haptics from 'expo-haptics'
import { copyToClipboard } from '@/shared/utils/keyboard'
import { useBoolean } from 'ahooks'

type Data =
  | (Omit<IHoleCommentListItem, 'replies' | 'repliesCount'> &
      Partial<Pick<IHoleCommentListItem, 'replies' | 'isNotification'>>)
  | IHoleReplyListItem

interface Props {
  data: Data
  bottom?: ReactNode
  selectable?: boolean
  onBodyPress?: (data: Data) => AwaitAble<void>
  onLikePress?: () => AwaitAble
  isReply?: boolean
  deleteLikeRequest: (data: { id: string }) => AwaitAble
  onLikeRequest: (data: { id: string }) => AwaitAble
}

const CommentBottomSheetAction: React.FC<{
  data: Data
  report: PartialExcludeField<ReportActionProps, 'type' | 'id'>
  visible: boolean
  onDismiss: Func
}> = (props) => {
  const { data, report, visible = false } = props

  const theme = useTheme()
  const [reportVisible, setReportVisible] = useState(false)

  const sheetRef = useRef<BottomSheetModal>()

  const list = [
    {
      text: '复制评论',
      icon: CopyIcon,
      onPress: () => {
        copyToClipboard(data?.body)
      },
    },
    {
      color: theme.colors.error,
      text: '举报',
      icon: DangerIcon,
      onPress: () => {
        setReportVisible(true)
      },
      keepAliveAfterClick: true,
    },
  ]

  const openSheet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    sheetRef.current?.present()
  }

  useEffect(() => {
    if (visible) {
      openSheet()
    } else {
      sheetRef.current?.close()
    }
  }, [visible])

  return (
    <BottomActionSheet
      onDismiss={props.onDismiss}
      ref={sheetRef as MutableRefObject<BottomSheetModal>}
    >
      <View className={'flex p-4 space-y-4'}>
        {list.map((Item) => {
          const onPress = async (e: GestureResponderEvent) => {
            await Item.onPress(e)

            if (!Item.keepAliveAfterClick) {
              sheetRef.current?.dismiss()
            }
          }

          return (
            <View
              key={Item.text}
              className={'bg-white rounded-lg overflow-hidden'}
            >
              <TouchableRipple onPress={onPress}>
                <View className={'p-4 flex-row items-center space-x-4'}>
                  <Item.icon
                    size={20}
                    color={Item.color || theme.colors.surfaceVariant}
                  />
                  <Text
                    style={{
                      color: Item.color || theme.colors.surfaceVariant,
                    }}
                  >
                    {Item.text}
                  </Text>
                </View>
              </TouchableRipple>
            </View>
          )
        })}
      </View>
      {report && (
        <ReportAction
          visible={reportVisible}
          setVisible={setReportVisible}
          {...report}
        />
      )}
    </BottomActionSheet>
  )
}

// TODO 解决 any 类型
export function CommentItem({
  data,
  bottom,
  onBodyPress,
  deleteLikeRequest,
  onLikeRequest,
}: Props) {
  const [commentSheetVisible, commentSheetVisibleActions] = useBoolean(false)

  const mutation = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked
        ? deleteLikeRequest({ id: data.id })
        : onLikeRequest({ id: data.id }),
  })

  return (
    <TouchableRipple
      onLongPress={() => {
        commentSheetVisibleActions.setTrue()
      }}
      onPress={() => onBodyPress?.(data)}
      className={'px-3'}
    >
      <View
        className={
          'w-full py-2 flex-row space-x-2 border-b-[1px] border-black/5'
        }
        key={data.id}
      >
        <CommentBottomSheetAction
          onDismiss={commentSheetVisibleActions.setFalse}
          visible={commentSheetVisible}
          data={data}
          report={{
            type: ReportType.hole,
            id: data.id,
          }}
        />
        <View className={'w-1/12'}>
          <UserAvatar url={data.user.avatar} userId={data.user.id} size={35} />
        </View>
        <View className={'space-y-1 w-11/12'}>
          <Text className={'text-tertiary-label text-sm'}>
            {data.user.username}
          </Text>
          <View>
            <EmojiableText
              textStyle={{
                fontSize: 14,
              }}
              body={data.body}
            />
          </View>
          <View className={'justify-between flex-row items-center pr-[2.5vw]'}>
            <TimeText time={data.createAt} />
            <CommentItemIsLike mutation={mutation} data={data} />
          </View>
          <View>{bottom}</View>
        </View>
      </View>
      {/*<View*/}
      {/*  className={`flex flex-row space-x-2 rounded-lg border-b-[1px] py-2 border-black/5`}*/}
      {/*  key={data.id}*/}
      {/*>*/}
      {/*  <View>*/}
      {/*    <View className={'w-full flex flex-row items-center space-x-2'}>*/}
      {/*      <View className={'w-1/12'}>*/}
      {/*        <UserAvatar*/}
      {/*          url={data.user?.avatar}*/}
      {/*          userId={data.user?.id}*/}
      {/*          size={35}*/}
      {/*        />*/}
      {/*      </View>*/}
      {/*      <View className={'flex flex-row justify-between w-11/12'}>*/}
      {/*        <View>*/}
      {/*          <UserText username={data.user.username} />*/}
      {/*        </View>*/}
      {/*        /!*<View>*!/*/}
      {/*        /!*  <CommentReplyBottomAction*!/*/}
      {/*        /!*    type={isReply ? ReportType.reply : ReportType.comment}*!/*/}
      {/*        /!*    data={data as any}*!/*/}
      {/*        /!*  />*!/*/}
      {/*        /!*</View>*!/*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*    <View className={'flex flex-row space-x-2 mt-[-10]'}>*/}
      {/*      <View className={'w-1/12'} />*/}
      {/*      <View className={'w-10/12 grid space-y-1'}>*/}
      {/*        <View>*/}
      {/*          <ReplyBody data={data as IHoleReplyListItem} />*/}
      {/*          <If condition={!!data.imgs?.length}>*/}
      {/*            <Then>*/}
      {/*              <View className={'mt-2'}>*/}
      {/*                <CommentImage data={data as IHoleReplyListItem} />*/}
      {/*              </View>*/}
      {/*            </Then>*/}
      {/*            <Else>*/}
      {/*              <></>*/}
      {/*            </Else>*/}
      {/*          </If>*/}
      {/*        </View>*/}
      {/*        <View className={'justify-between flex-row items-center'}>*/}
      {/*          <TimeText time={data.createAt} />*/}
      {/*          <CommentItemIsLike mutation={mutation} data={data} />*/}
      {/*        </View>*/}
      {/*        <View>{bottom}</View>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</View>*/}
    </TouchableRipple>
  )
}

const CommentItemIsLike: React.FC<{
  data: Data
  mutation: UseMutationResult<unknown, unknown, boolean, unknown>
}> = ({ mutation, data }) => {
  return <AnimatedLikeButton data={data} mutation={mutation} />
}
