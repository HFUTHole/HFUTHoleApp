import { Pressable, ScrollView, View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserFavoriteHoleList, useUserPostedHoleList } from '@/swr/user/hole'
import { useUserProfile } from '@/swr/user/profile'
import { type ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { MyAvatar, UserAvatar } from '@/components/UserAvatar'
import { Appbar, Button, Text, TouchableRipple } from 'react-native-paper'
import { UserLevelBar } from '@/pages/user/components/UserLevelBar'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
  SCROLLABLE_TYPE,
  createBottomSheetScrollableComponent,
} from '@gorhom/bottom-sheet'
import React, { forwardRef, memo, useRef, useState } from 'react'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Image } from 'expo-image'
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
import { TagHoleInfo } from '@/pages/hole/components/TagHoleInfo'
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import { LinearGradient } from 'expo-linear-gradient'
import { ProfileScreenTabBar } from '@/pages/user/profile/OtherUserProfile'
import { Tabs, useCurrentTabScrollY } from 'react-native-collapsible-tab-view'

/**
 * 适合用于底部弹出的瀑布流列表
 */
export const ProfileHoleListMasonryList = memo((props: any) => {
  const { data } = props
  return (
    <View className="flex-1">
      <Tabs.MasonryFlashList
        numColumns={2}
        estimatedItemSize={255}
        data={data}
        {...props}
      />
    </View>
  )
})

/**
 * 个人主页的帖子列表
 */
export const ProfileHoleList = (props: any) => {
  return (
    <View className="flex-1">
      <RefreshableHoleList
        {...props}
        showFab={false}
        FlatListComponent={ProfileHoleListMasonryList}
        style={{
          backgroundColor: '#fff',
        }}
        contentContainerStyle={{
          backgroundColor: '#fff',
          flex: 1,
        }}
        renderItem={({ item: data }) => {
          return (
            <View className={'w-[48vw] mx-auto mt-[5px]'}>
              <TagHoleInfo data={data as any} />
            </View>
          )
        }}
      />
    </View>
  )
}

const UserHoleList = () => {
  const query = useUserPostedHoleList()
  return <ProfileHoleList {...query} />
}

const UserFavList = () => {
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
  // {
  //   key: 'user-fav',
  //   title: '收藏',
  //   component: UserFavList,
  // },
  {
    key: 'user-favorite-hole',
    title: '喜欢',
    component: UserFavoriteHoleList,
  },
]

const ProfileScreenHeader: React.FC<{
  scrollTimeline: SharedValue<number>
}> = ({ scrollTimeline }) => {
  const { data } = useUserProfile()
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

// 简介
const ProfileBio: React.FC<{ data: IUserProfile }> = ({ data }) => {
  return (
    <View className={'flex-row space-x-2'}>
      {/* <Text className={'text-black text-xs'}>还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦</Text> */}
      <View className={'flex-1'}>
        <Text className={'text-white/75 text-s'} numberOfLines={1}>
          {data?.desc || ''}
        </Text>
      </View>
    </View>
  )
}

export const LevelBanner = ({ level }: { level: number }) => {
  return (
    <View>
      <Text className={'text-white/75'}>Lv.{level}</Text>
    </View>
  )
}

const ProfileHeader = (props: { scrollTimeline: SharedValue<number> }) => {
  const { data, levelPercent } = useUserProfile()

  const { data: commentData } = useUserCommentsListQuery()

  const { goFollowingScreen } = useUserProfileRoute()

  const bottomSheetPosFrom = 60

  const userProfileRoute = useUserProfileRoute()

  const scrollTimeline = useCurrentTabScrollY()
  useDerivedValue(() => {
    props.scrollTimeline.value = scrollTimeline.value
  })

  const animatedBgImgHeight = useAnimatedStyle(() => {
    return {
      height: scrollTimeline.value < 310 ? 386 - scrollTimeline.value : 76,
      marginTop: scrollTimeline.value < 310 ? -144 + scrollTimeline.value : 0, // Height of the header + margin: 64px + 80px
    }
  })

  return (
    <View className={'mt-[64px]'} style={{ pointerEvents: 'box-none' }}>
      <Animated.View
        className={'absolute w-full  z-[0] mt-[-144px]'}
        style={[animatedBgImgHeight, { pointerEvents: 'none', bottom: 0 }]}
      >
        <View
          className={'absolute w-full h-[100%] top-[0] z-[1] bg-black/20'}
        ></View>
        <LinearGradient
          className={'absolute w-full h-[100%] top-[0] z-[1]'}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        />
        <Image
          className={'absolute w-full h-[100%] top-[0]'}
          source={{
            uri: 'https://static.xiaofeishu.lnyynet.com/insecure/q:30/rs:fill:400:800:no:0/plain/local:///2024_06_09/1799758420216123392.png',
          }}
          contentPosition={'center'}
          cachePolicy={'disk'}
        />
      </Animated.View>
      <View
        className={'w-100 z-[1] px-4'}
        style={{ pointerEvents: 'box-none' }}
      >
        <View className={'flex-column'}>
          <View className={'flex-row items-center space-x-4'}>
            {/* 头像、用户名、id */}
            <MyAvatar size={72} />
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
          <View className={'flex-row items-center space-x-4 mt-5 mb-3'}>
            {/* 简介 */}
            <ProfileBio data={data!} />
          </View>

          <View className={'flex-row items-center space-x-2 mb-4'}>
            <View
              className={
                'flex-row justify-between align-center py-2 flex-[0.85]'
              }
            >
              {/* 数据 */}
              <Pressable
                onPress={() => {
                  goFollowingScreen(data?.id!)
                }}
                className={'flex-col align-center'}
              >
                <Text
                  className={'text-center text-white font-bold text-[20px]'}
                >
                  {data?.following}
                </Text>
                <Text className={'text-center text-white/70 text-[16px]'}>
                  关注
                </Text>
              </Pressable>
              <Pressable
                className={'flex-col align-center'}
                onPress={() => {
                  goFollowingScreen(data?.id!, false)
                }}
              >
                <Text
                  className={'text-center text-white font-bold text-[20px]'}
                >
                  {data?.followers}
                </Text>
                <Text className={'text-center text-white/70 text-[16px]'}>
                  粉丝
                </Text>
              </Pressable>
              <View className={'flex-col align-center'}>
                <Text
                  className={'text-center text-white font-bold text-[20px]'}
                >
                  {data?.posts}
                </Text>
                <Text className={'text-center text-white/70 text-[16px]'}>
                  帖子
                </Text>
              </View>
            </View>

            <View className={'flex-row justify-end align-center flex-1'}>
              <Button
                mode="outlined"
                textColor="#ffffffee"
                buttonColor="#1f1f1f88"
                onPress={() => {
                  userProfileRoute.goEditScreen()
                }}
                className={`shadow-none rounded-full `}
                style={{
                  borderColor: '#ffffff88',
                  borderWidth: 2,
                }}
                contentStyle={{
                  paddingVertical: 0,
                  paddingHorizontal: 6,
                }}
                theme={{ version: 2, isV3: false }}
              >
                编辑资料
              </Button>
            </View>
          </View>
        </View>
      </View>
      <View className="absolute w-full bottom-[0] bg-white h-2 rounded-t-2xl"></View>
    </View>
  )
}

export function ProfileScreen() {
  const scrollTimeline = useSharedValue(0)

  return (
    <LoadingScreen isLoading={false}>
      <ProfileScreenHeader scrollTimeline={scrollTimeline} />
      <Tabs.Container
        renderHeader={() => <ProfileHeader scrollTimeline={scrollTimeline} />}
        headerHeight={300}
        minHeaderHeight={0}
        tabBarHeight={48}
        allowHeaderOverscroll={true}
        headerContainerStyle={{
          backgroundColor: '#ffffff',
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
