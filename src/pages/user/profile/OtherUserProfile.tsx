import { Pressable, View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserFavoriteHoleList, useUserPostedHoleList } from '@/swr/user/hole'
import { useOtherUserData, useUserProfile } from '@/swr/user/profile'
import { type ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'
import { MyAvatar, UserAvatar } from '@/components/UserAvatar'
import { Appbar, Button, Text, TouchableRipple } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabBar } from 'react-native-tab-view'
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useUserCommentsListQuery } from '@/swr/user/comment'
import { FollowButton } from '@/components/user/FollowButton'
import { useParams } from '@/shared/hooks/useParams'
import { LevelBanner, ProfileHoleList } from './ProfileScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from '@/components/image/Image'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import {
  MaterialTabBar,
  MaterialTabItem,
  TabBarProps,
  Tabs,
  useCurrentTabScrollY,
} from 'react-native-collapsible-tab-view'

const UserHoleList = () => {
  const query = useUserPostedHoleList()
  return <ProfileHoleList {...query} />
}

const UserFavoriteHoleList = () => {
  const query = useUserFavoriteHoleList()
  return <ProfileHoleList {...query} />
}

const tabs: ITabViewTabs[] = [
  {
    key: 'user-hole',
    title: '发表',
    component: UserHoleList,
  },
  {
    key: 'user-favorite-hole',
    title: '喜欢',
    component: UserFavoriteHoleList,
  },
]

const ProfileScreenHeader: React.FC<{
  scrollTimeline: SharedValue<number>
  data: IUser
}> = ({ data, scrollTimeline }) => {
  const navigation = useNavigation()
  // Header 背景透明度
  const animatedOpacity = useAnimatedStyle(() => {
    const fromAt = 164 // opacity 0
    const toAt = 246 // opacity 1
    const opacity = (scrollTimeline.value - fromAt) / (toAt - fromAt)
    return {
      opacity: Math.min(1, Math.max(0, opacity)),
    }
  })
  // 用户名透明度
  const animatedNameOpacity = useAnimatedStyle(() => {
    const fromAt = 164
    const toAt = 246
    const opacity = (scrollTimeline.value - fromAt) / (toAt - fromAt)
    return {
      opacity: Math.min(1, Math.max(0, opacity)),
    }
  })
  const [backColor, setBackColor] = useState('#fff')
  useDerivedValue(() => {
    if (scrollTimeline.value > 164) {
      runOnJS(setBackColor)('#333')
    } else {
      runOnJS(setBackColor)('#fff')
    }
  })

  return (
    <Animated.View
      className={
        'w-screen top-[0] overflow-hidden flex flex-row items-center h-[80]  z-[2000] pt-[30] '
      }
    >
      <Animated.View
        className={
          'absolute w-full h-[80] bg-white border-b-[1px] border-black/5'
        }
        style={[animatedOpacity]}
      ></Animated.View>
      <Appbar.BackAction
        onPress={() => navigation.goBack()}
        color={backColor}
      />
      <Animated.View
        className={'flex flex-row justify-between'}
        style={[animatedNameOpacity]}
      >
        <View className={'flex flex-row items-center space-x-2'}>
          <UserAvatar url={data?.avatar} size={35} />
          <View>
            <Text className={'text-[16px] text-black'}>{data?.username}</Text>
          </View>
        </View>

        <View className={'flex flex-row justify-end items-center space-x-5'}>
          {/* <FollowButton followingId={data.user.id} />
          <HoleBottomAction data={data as IHoleDetailResponse} /> */}
        </View>
      </Animated.View>
    </Animated.View>
  )
}

export const ProfileScreenTabBar = (props: TabBarProps) => {
  return (
    <MaterialTabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#171821' }}
      style={{
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      TabItemComponent={(itemProps) => (
        <MaterialTabItem
          {...itemProps}
          style={{ backgroundColor: '#ffffff' }}
          inactiveColor="#000"
          inactiveOpacity={0.7}
          activeColor="#000"
        />
      )}
    />
  )
}

const ProfileBio = () => {
  const [viewMore, setViewMore] = useState(true)
  return (
    <View className={'flex-row space-x-2'}>
      <View className={'flex-1'}>
        <Text
          className={'text-black text-sm'}
          numberOfLines={viewMore ? undefined : 1}
        >
          还没有简介哦
        </Text>
      </View>
      <View></View>
    </View>
  )
}

const OtherUserProfileHeader = (props: {
  scrollTimeline: SharedValue<number>
}) => {
  const { userId } = useParams<{ userId: number }>()
  const route = useUserProfileRoute()
  const { data, levelPercent, isLoading } = useOtherUserData(userId)

  const { data: commentData } = useUserCommentsListQuery()

  const tags = ['小肥书']
  const symbol: { [key: string]: { symbol: string; color: string } } = {
    He: { symbol: '♂', color: '#5B9BD5' },
    She: { symbol: '♀', color: '#FF7F50' },
    They: { symbol: '⚥', color: '#FFD700' },
  }

  const scrollTimeline = useCurrentTabScrollY()
  useDerivedValue(() => {
    props.scrollTimeline.value = scrollTimeline.value
  })
  const animatedBgImgHeight = useAnimatedStyle(() => {
    return {
      height: scrollTimeline.value < 263 ? 443 - scrollTimeline.value : 180,
      marginTop: scrollTimeline.value < 263 ? -144 + scrollTimeline.value : 0, // Height of the header + margin: 64px + 80px
    }
  })

  return (
    <View className="mt-[64px]">
      <Animated.View
        className={'absolute w-full top-[0] z-[0] mt-[-144px]'}
        style={[animatedBgImgHeight, { pointerEvents: 'none' }]}
      >
        <LinearGradient
          className={'absolute w-full h-[100%] top-[0] z-[1]'}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        />
        <Image
          className={'absolute w-full h-[100%] top-[0]'}
          source={{
            uri: 'https://static.xiaofeishu.lnyynet.com/insecure/q:30/rs:fill:400:800:no:0/plain/local:///2024_06_09/1799758420216123392.png',
          }}
        />
      </Animated.View>
      <View
        className={'w-100 h-100 z-[1] left-[16] right-[16]'}
        style={{
          pointerEvents: 'none',
        }}
      >
        <View className={'flex-column'}>
          <View className={'flex-row items-center space-x-4 mb-5'}>
            {/* 头像、用户名、id */}
            <UserAvatar url={data?.avatar} size={96} />
            <View className={'ml-1 justify-center space-y-2'}>
              <View className={'flex-row space-x-3 items-center'}>
                <Text className={'text-white font-bold text-[24px]'}>
                  {data?.username}
                </Text>
                <View>
                  <LevelBanner level={data?.level?.level || 0} />
                </View>
              </View>
              <Text className={'text-white/60 text-s'}>
                小肥书UID: {data?.id}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Animated.View
        className={'px-[3.5vw] space-y-4 pb-4 bg-white rounded-t-2xl'}
        style={{
          pointerEvents: 'box-none',
        }}
      >
        <View className={'flex-row justify-start align-center space-x-3 mt-2'}>
          <Pressable
            onPress={() => {
              route.goFollowingScreen(data?.id!, true)
            }}
            className={'flex-row items-center space-x-1'}
          >
            <Text className={'text-center text-black font-bold text-xl'}>
              {data?.following}
            </Text>
            <Text className={'text-center text-black/60 text-sm'}>
              关注
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              route.goFollowingScreen(data?.id!, false)
            }}
            className={'flex-row items-center space-x-1'}
          >
            <Text className={'text-center text-black font-bold text-xl'}>
              {data?.followers}
            </Text>
            <Text className={'text-center text-black/60 text-sm'}>
              粉丝
            </Text>
          </Pressable>
          {/* TODO: 换些别的数据？🤔 */}
          <View className={'flex-row items-center space-x-1'}>
            <Text className={'text-center text-black font-bold text-xl'}>
              {commentData?.pages[0].meta.totalItems}
            </Text>
            <Text className={'text-center text-black/60 text-sm'}>帖子</Text>
          </View>
        </View>
        <View>
          <ProfileBio />
        </View>
        <View className={'flex-row items-center space-x-2 mb-1'}>
          {/* tag */}
          {tags.map((tag) => (
            <View
              key={tag}
              className={
                ' bg-black/10 rounded min-w-[30px] flex-row items-center justify-center'
              }
            >
              {symbol[tag] ? (
                <Text
                  className={'px-2 pt-1 text-[16px] leading-[16px]'}
                  style={{ color: symbol[tag].color }}
                >
                  {symbol[tag].symbol}
                </Text>
              ) : (
                <Text className={'px-2 py-0.5 text-[#333] text-xs'}>{tag}</Text>
              )}
            </View>
          ))}
        </View>
        <View>
          <FollowButton followingId={data?.id!} className={'py-2.5 rounded'} />
        </View>
      </Animated.View>
    </View>
  )
}

export function OtherUserProfileScreen() {
  const { userId } = useParams<{ userId: number }>()
  const { data, levelPercent, isLoading } = useOtherUserData(userId)

  const scrollTimeline = useSharedValue(0)

  return (
    <LoadingScreen isLoading={isLoading}>
      {/* <StatusBar translucent={true} /> */}
      <ProfileScreenHeader data={data!} scrollTimeline={scrollTimeline} />

      <Tabs.Container
        renderHeader={() => (
          <OtherUserProfileHeader scrollTimeline={scrollTimeline} />
        )}
        headerHeight={300}
        minHeaderHeight={0}
        tabBarHeight={48}
        allowHeaderOverscroll={true}
        headerContainerStyle={{
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
        }}
        renderTabBar={ProfileScreenTabBar}
      >
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.key} name={tab.key} label={tab.title}>
            <tab.component />
          </Tabs.Tab>
        ))}
      </Tabs.Container>
    </LoadingScreen>
  )
}
