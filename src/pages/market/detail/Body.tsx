import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { TimeText } from '@/components/Text/Time'
import { FollowButton } from '@/components/user/FollowButton'
import { CarouselImage } from '@/components/image/CarouselImage'
import { ScreenWidth } from '@/shared/utils/utils'
import { useUsedGoodsDetail } from '@/swr/market/goods'
import { useUsedGoodsRoute } from '@/shared/hooks/route/useUsedGoodsRoute'

export const UsedGoodsDetailBody: React.FC = () => {
  const { data } = useUsedGoodsDetail()

  const { goCategory } = useUsedGoodsRoute()

  return (
    <View className={'space-y-5'}>
      <View className={'px-[2.5vw]'}>
        <View className={'flex-row space-x-2 items-center'}>
          <UserAvatar
            size={50}
            url={data?.creator.avatar}
            userId={data?.creator.id}
          />

          <View>
            <Text className={'text-primary-label text-lg font-bold'}>
              {data?.creator.username}
            </Text>
            <View className={'flex-row'}>
              <TimeText
                style={{
                  fontSize: 12,
                }}
                time={data?.createAt!}
              />
              <Text className={'text-tertiary-label text-xs'}>
                发布于{data?.area!}
              </Text>
            </View>
          </View>
        </View>
        <FollowButton followingId={data?.creator.id!} />
      </View>
      <View className={'px-[2.5vw]'}>
        <View className={'flex-row'}>
          <Text className={'self-end text-primary font-bold'}>
            ¥
            <Text className={'self-end text-primary font-bold text-2xl'}>
              {data?.price.toString()}
            </Text>
          </Text>
        </View>
        <Text className={'text-primary-label mt-2'}>{data?.body}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            goCategory(data?.category.name!)
          }}
        >
          <Text className={'text-link mt-2 font-bold'}>
            #{data?.category.name || ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View className={'h-[500px] pb-4 px-[2.5vw]'}>
        <CarouselImage
          imgs={data?.imgs!}
          height={500}
          width={ScreenWidth * 0.95}
          imageProps={{
            style: {
              borderRadius: 10,
            },
          }}
        />
      </View>
    </View>
  )
}
