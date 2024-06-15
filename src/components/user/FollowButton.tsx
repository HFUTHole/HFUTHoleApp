import React from 'react'
import { Text } from 'react-native-paper'
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { useUserProfile } from '@/swr/user/profile'
import { useIsFollowedQuery } from '@/swr/user/follow'
import clsx from 'clsx'
import { useMutation } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { Apis } from '@/request/apis'
import { If, Then } from 'react-if'
import Animated from 'react-native-reanimated'
import { PlusIcon } from 'react-native-heroicons/solid'

interface FollowButtonProps extends ViewProps {
  followingId: number
  textStyle?: StyleProp<ViewStyle> | string
}

export const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const { followingId } = props
  const { data, refetch } = useIsFollowedQuery(followingId)
  const { data: userData } = useUserProfile()

  const isFollowed = !!data?.isFollowed

  const mutation = useMutation({
    mutationKey: [SWRKeys.user.isFollowed, isFollowed],
    mutationFn: (userId: number) => {
      const params = { userId }
      const func = isFollowed
        ? Apis.user.unfollowUserRequest
        : Apis.user.followUserRequest

      return func(params)
    },
    onSuccess() {
      refetch()
    },
  })

  const onFollowButtonPress = () => {
    mutation.mutate(followingId)
  }

  return (
    <If condition={userData?.id !== followingId}>
      <Then>
        <TouchableOpacity activeOpacity={0.8} onPress={onFollowButtonPress}>
          <View
            className={clsx([
              'flex-row items-center space-x-1 bg-primary rounded-full justify-center px-4 py-[6px]',
              {
                'bg-[#efefef] border-active-bg-border': isFollowed,
              },
              props.className,
            ])}
            style={props.style}
          >
            <If condition={!isFollowed}>
              <Then>
                <PlusIcon size={16} color={'#fff'} />
              </Then>
            </If>
            <Text
              className={clsx([
                'text-white flex-row items-center justify-center',
                {
                  'text-black': isFollowed,
                },
                props.className,
              ])}
              style={props.textStyle as object}
            >
              {isFollowed ? '已关注' : '关注'}
            </Text>
          </View>
        </TouchableOpacity>
      </Then>
    </If>
  )
}
