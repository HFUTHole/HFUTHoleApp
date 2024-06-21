import React, { ReactNode, useState } from 'react'
import { Func, IClassName, InferArrayItem } from '@/shared/types'
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { Button, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { TimeText } from '@/components/Text/Time'
import { ImageList } from '@/components/image/ImageList'
import { useMutation } from 'react-query'
import { PostHoleVoteRequest } from '@/request/apis/hole'
import { Toast } from '@/shared/utils/toast'
import { HoleVoteItem } from '@/pages/hole/components/VoteItem'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { EmojiableText } from '@/components/Text/EmojiableText'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { Svg } from '@/components/svg/Svg'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { HoleBottomAction } from './sheet/HoleBottomAction'
import { Categories } from '@/shared/constants/category'
import { Icons, TagIcon } from '@/components/svg/SvgIcons'
import { HoleLikeButton } from '@/pages/hole/components/HoleLikeButton'
import { Image } from 'expo-image'
import { sliceHoleInfoCommentBody } from '@/pages/hole/components/utils'
import { HoleInfoBottomCommentArea } from '@/pages/hole/components/HoleInfoBottomCommentArea'
import { FollowButton } from '@/components/user/FollowButton'
import { HoleDetailImageCarousel } from '@/pages/hole/detail/components/HoleDetailImageCarousel'
import { Else, If, Then } from 'react-if'
import { HoleDetailTags } from '@/pages/hole/detail/components/HoleDetailTags'

type Data = IHole

type VoteItem = InferArrayItem<Data['vote']['items']>

export const HoleInfoVote: React.FC<{ data: Data }> = ({ data }) => {
  const [onSuccess, setOnSuccess] = useState<Func>()

  const mutation = useMutation({
    mutationKey: [data.vote.id, data.vote.isVoted],
    mutationFn: (ids: string[]) =>
      PostHoleVoteRequest({
        id: data.vote.id,
        ids,
      }),
    onSuccess() {
      Toast.success({
        text1: '投票成功',
      })
      // onSuccess?.()
    },
  })

  const onVotePress = (item: VoteItem, func: Func) => {
    if (data.vote.isVoted) {
      return
    }

    if (data.vote.type === 'single') {
      mutation.mutate([item.id])
    }

    setOnSuccess(func)
  }

  return (
    <View>
      <View className={'grid space-y-2'}>
        {data.vote.items.map((item) => (
          <View key={item.id}>
            <HoleVoteItem
              data={item}
              hole={data}
              onPress={(item, func) => onVotePress(item, func)}
            />
          </View>
        ))}
        {data.vote.isVoted && (
          <View className={'flex flex-row justify-end w-full'}>
            <SecondaryText>
              一共有{data.vote.totalCount}人参与投票
            </SecondaryText>
          </View>
        )}
      </View>
    </View>
  )
}

export const HoleInfoHeader: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <>
      <View className={'my-1 space-y-1'}>
        <View className={'flex flex-row justify-between'}>
          <View className={'flex flex-row items-center space-x-4'}>
            <UserAvatar
              userId={data.user.id}
              url={data.user.avatar}
              size={35}
            />
            <View>
              <Text className={'text-[16px] text-black'}>
                {data.user.username}
              </Text>
              <Text className={'text-primary-label text-sm'}>#{data.id}</Text>
            </View>
          </View>

          <View className={'flex flex-row justify-end items-center space-x-5'}>
            <FollowButton followingId={data.user.id} />
            <HoleBottomAction data={data as IHoleDetailResponse} />
          </View>
        </View>
      </View>
    </>
  )
}

export const HomeListInfoHeader: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <>
      <View className={'my-1 space-y-1'}>
        <View className={'flex flex-row justify-between'}>
          <View className={'flex flex-row items-center space-x-4'}>
            <UserAvatar
              userId={data.user.id}
              url={data.user.avatar}
              size={35}
            />
            <View>
              <Text className={'text-[16px] text-black'}>
                {data.user.username}
              </Text>
              <If condition={data.createAt === data.updateAt}>
                <Then>
                  <TimeText time={data.createAt} />
                </Then>
                <Else>
                  <TimeText textLeft={'更新于'} time={data.updateAt} />
                </Else>
              </If>
            </View>
          </View>

          <View className={'flex flex-row justify-end items-center space-x-5'}>
            <Text className={'text-primary-label'}>#{data.id}</Text>
            <HoleBottomAction data={data as IHoleDetailResponse} />
          </View>
        </View>
      </View>
    </>
  )
}

export const HoleInfoTitle: React.FC<{ data: Data }> = ({ data }) => {
  const classification = Categories.find(
    (item) => item.name === data.classification?.name,
  )

  return (
    <View className={'flex space-y-2'}>
      <View className={'flex-row space-x-2 items-center'}>
        <View
          className={'py-1 px-2 rounded-lg'}
          style={{ backgroundColor: classification?.color.secondary }}
        >
          <Text
            className={'font-bold'}
            style={{ color: classification?.color.primary }}
          >
            {data.classification?.name}
          </Text>
        </View>
        <Text
          className={'font-bold'}
          style={{ color: classification?.color.primary }}
        >
          {data.subClassification?.name}
        </Text>
      </View>
      {data.title && (
        <Text className={'font-bold text-base'}>{data?.title}</Text>
      )}
    </View>
  )
}

const Tag: React.FC<{ data: string }> = ({ data }) => {
  return (
    <View
      className={
        'px-2 py-1 border-[1px] border-gray-200/50 flex-row justify-between items-center rounded-full space-x-2'
      }
    >
      <View className={'bg-[#323538] rounded-full p-1'}>
        <TagIcon size={12} color={'#fff'} />
      </View>
      <Text className={'text-[#88898b]'}>{data}</Text>
    </View>
  )
}

export const HoleInfoTitleWithBody: React.FC<{
  data: Data
  numberOfLines?: number
  hideOverflow?: boolean
}> = (props) => {
  const { data, hideOverflow = true, numberOfLines = 3 } = props
  return (
    <>
      <If condition={data.title}>
        <Then>
          <Text className={'text-base font-bold text-black'}>{data.title}</Text>
        </Then>
      </If>
      <View className={'mt-2'}>
        <EmojiableText
          body={data.body}
          textStyle={{
            color: 'rgba(0, 0, 0, .75)',
            lineHeight: 20,
            fontSize: 14,
          }}
          numberOfLines={numberOfLines}
          hideOverflow={hideOverflow}
        />
      </View>
    </>
  )
}

export const HoleInfoBody: React.FC<{
  data: Data
  isDetail?: boolean
  renderImage?: boolean
}> = (props) => {
  const { data, isDetail = false } = props
  // const { goResult } = useHoleSearchRoute()

  return (
    <View className={'flex space-y-2'}>
      {/*{data.imgs.length ? (*/}
      {/*  <View>*/}
      {/*    <HoleDetailImageCarousel*/}
      {/*      height={200}*/}
      {/*      data={data}*/}
      {/*      imageProps={{ resizeMode: 'contain' }}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
      <View className={'px-3'}>
        <HoleInfoTitleWithBody
          data={data}
          numberOfLines={5}
          hideOverflow={true}
        />
        <If condition={data.tags?.length}>
          <Then>
            <View className={'mt-2'}>
              <HoleDetailTags data={data!} />
            </View>
          </Then>
        </If>
      </View>
      {data.imgs.length ? (
        <View className={'px-1'}>
          <ImageList imgs={data.imgs.slice(0, 3)} />
        </View>
      ) : (
        <></>
      )}

      {/*{data.tags.length ? (*/}
      {/*  <View className={'flex-row space-x-2'}>*/}
      {/*    <Badges data={data.tags} />*/}
      {/*  </View>*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
    </View>
  )
}

export const HoleInfoBottom: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <View className={'flex-row justify-between'}>
      <View className={'flex-1 flex-row justify-center items-center space-x-1'}>
        <Icons.ShareIcon size={20} />
        <Text className={'text-black/70 text-xs'}>分享</Text>
      </View>
      <View className={'flex-1 flex-row justify-center items-center space-x-1'}>
        <Icons.CommentIcon size={20} />
        <Text className={'text-black/70 text-xs'}>{data.commentCounts}</Text>
      </View>
      <View className={'flex-1 flex-row justify-center items-center'}>
        <HoleLikeButton data={data} size={20} />
      </View>
    </View>
  )
}

interface Props extends IClassName {
  data: Data
  showComment?: boolean
  onPress?: Func
  header?: ReactNode
  body?: ReactNode
  bottom?: ReactNode
  isScroll?: boolean
}

export const HoleInfo = ({
  data,
  onPress,
  header,
  body,
  bottom,
  showComment = true,
}: Props) => {
  return (
    <View className={'bg-white rounded-2xl overflow-hidden z-[1]'}>
      <TouchableRipple onPress={onPress}>
        <View className={'space-y-2 py-3'}>
          {header || (
            <View className={'px-3'}>
              <HomeListInfoHeader data={data} />
            </View>
          )}
          {body || <HoleInfoBody data={data} />}
          {data.vote && (
            <View className={'px-3'}>
              <HoleInfoVote data={data} />
            </View>
          )}
          <View className={'px-3'}>
            {bottom || <HoleInfoBottom data={data} />}
          </View>
          <View className={'px-3'}>
            {showComment && data.comments?.length > 0 && (
              <HoleInfoBottomCommentArea data={data} />
            )}
          </View>
        </View>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    lineHeight: 28,
    transform: [{ translateY: -7 }],
  },
  categoryText: {
    fontSize: 18,
  },
})
