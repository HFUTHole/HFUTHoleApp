import React from 'react'
import { Text } from 'react-native-paper'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { useUserProfile } from '@/swr/user/profile'
import { useIsFollowedQuery } from '@/swr/user/follow'
import clsx from 'clsx'
import { useMutation } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { Apis } from '@/request/apis'
import { If, Then } from 'react-if'

interface FollowButtonProps {
  followingId: number,
  style?: StyleProp<ViewStyle> | string,
  textStyle?: StyleProp<ViewStyle> | string,
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
        <TouchableOpacity
          className={clsx([
            'bg-primary rounded-full justify-center items-center px-4 py-[5px]',
            {
              'bg-active-background border-[1px] border-active-bg-border':
                isFollowed,
            },
            typeof props.style === 'string' ? props.style : '',
          ])}
          onPress={onFollowButtonPress}
          style={[typeof props.style === 'string' ? {} : props.style]}
        >
          <Text
            className={clsx([
              'text-white',
              {
                'text-black': isFollowed,
              },
              typeof props.style === 'string' ? props.style : '',
            ])}
            style={[typeof props.style === 'string' ? {} : props.style]}
          >
            {isFollowed ? '取关' : '关注'}
          </Text>
        </TouchableOpacity>
      </Then>
    </If>
  )
}
