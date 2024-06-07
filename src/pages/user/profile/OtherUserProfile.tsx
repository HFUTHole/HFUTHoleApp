import { Pressable, StatusBar, View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserFavoriteHoleList, useUserPostedHoleList } from '@/swr/user/hole'
import { useOtherUserData, useUserProfile } from '@/swr/user/profile'
import { type ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { MyAvatar, UserAvatar } from '@/components/UserAvatar'
import { Appbar, Button, Text, TouchableRipple } from 'react-native-paper'
import { UserLevelBar } from '@/pages/user/components/UserLevelBar'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
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
import { FollowButton } from '@/components/user/FollowButton'
import { useParams } from '@/shared/hooks/useParams'
import { LevelBanner, ProfileHoleList } from './ProfileScreen'
import { LinearGradient } from 'expo-linear-gradient'

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
    const fromAt = 85
    const toAt = 120
    const opacity = 1 - (scrollTimeline.value - fromAt) / (toAt - fromAt)
    return {
      opacity: Math.min(1, Math.max(0, opacity)),
    }
  })
  // 用户名透明度
  const animatedNameOpacity = useAnimatedStyle(() => {
    const fromAt = 85
    const toAt = 120
    const opacity = 1 - (scrollTimeline.value - fromAt) / (toAt - fromAt)
    return {
      opacity: Math.min(1, Math.max(0, opacity)),
    }
  })
  const [backColor, setBackColor] = useState('#fff')
  useDerivedValue(() => {
    if (scrollTimeline.value < 120) {
      runOnJS(setBackColor)('#333')
    } else {
      runOnJS(setBackColor)('#fff')
    }
  })

  return (
    <Animated.View
      className={
        'absolute w-screen top-[0] overflow-hidden flex flex-row items-center h-[80]  z-[2000] pt-[30] '
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

const ProfileScreenTabBar = (props: any) => {
  return (
    <View className={'bg-white'}>
      <TabBar
        {...props}
        style={{
          backgroundColor: 'transparent',
          elevation: 0,
        }}
        indicatorStyle={{
          backgroundColor: '#171821',
        }}
        renderLabel={({ route, focused }) => (
          <Text
            className={`${
              focused ? 'text-black' : 'text-black/70'
            } text-[14px]`}
          >
            {route.title}
          </Text>
        )}
      />
    </View>
  )
}

// 简介
const ProfileBio = () => {
  const [viewMore, setViewMore] = useState(true)
  return (
    <View className={'flex-row space-x-2'}>
      {/* <Text className={'text-black text-xs'}>还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦</Text> */}
      <View className={'flex-1'}>
        <Text
          className={'text-black text-sm'}
          numberOfLines={viewMore ? undefined : 1}
        >
          还没有简介哦
        </Text>
      </View>
      <View>
        {/* <Pressable onPress={() => setViewMore(!viewMore)}>
          <Text className={'text-[#5B9BD5] text-xs px-2 '}>
            {viewMore ? '收起' : '详情'}
          </Text>
        </Pressable> */}
      </View>
    </View>
  )
}

export function OtherUserProfileScreen() {
  const { userId } = useParams<{ userId: number }>()
  const { data, levelPercent } = useOtherUserData(userId)

  const { data: commentData } = useUserCommentsListQuery()

  const tags = ['小肥书']
  const symbol: { [key: string]: { symbol: string; color: string } } = {
    He: { symbol: '♂', color: '#5B9BD5' },
    She: { symbol: '♀', color: '#FF7F50' },
    They: { symbol: '⚥', color: '#FFD700' },
  }

  const bottomSheetRef = useRef<BottomSheetMethods>()

  // 大约从 163 (初始) 到 -110
  // overDrag时会大于 163
  const scrollTimeline = useSharedValue(163)

  // 背景图片高度，跟随滚动变化
  const animatedBgImgHeight = useAnimatedStyle(() => {
    return {
      height: scrollTimeline.value > 0 ? scrollTimeline.value + 15 : 15,
    }
  })

  const infoHeight = useSharedValue(20)

  // 同步滚动移动
  const syncedTranslateY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollTimeline.value - infoHeight.value }],
    }
  })

  return (
    <LoadingScreen isLoading={false}>
      {/* <StatusBar translucent={true} /> */}
      <ProfileScreenHeader data={data!} scrollTimeline={scrollTimeline} />
      <Animated.View
        className={'absolute w-full top-[0]'}
        style={[animatedBgImgHeight]}
      >
        <LinearGradient
          className={'absolute w-full h-[100%] top-[0] z-[1]'}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        />
        <Image
          className={'absolute w-full h-[100%] top-[0]'}
          source={{
            // TODO: 替换占位图
            uri: 'https://c-ssl.duitang.com/uploads/blog/202206/18/20220618182459_fd9d9.png',
          }}
          contentPosition={'center'}
          cachePolicy={'disk'}
        />
      </Animated.View>

      <Animated.View
        className={'absolute w-100 h-100 z-[1] left-[16] right-[16]'}
        style={[syncedTranslateY]}
        onLayout={(e) => {
          infoHeight.value = e.nativeEvent.layout.height
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
      </Animated.View>

      <SafeAreaView className={'flex-1'}>
        <BottomSheet
          ref={bottomSheetRef as any}
          snapPoints={Array.from({ length: 35 }, (_, i) => `${65 + i}%`)}
          animatedPosition={scrollTimeline}
          overDragResistanceFactor={10}
          // enableDynamicSizing={true}
          topInset={-125}
          handleIndicatorStyle={{
            display: 'none',
          }}
          handleStyle={{
            padding: 2,
          }}
        >
          <Animated.View
            className={'px-[2.5vw] space-y-4 mb-4 mx-2'}
            style={{}}
          >
            <View
              className={'flex-row justify-start align-center space-x-3 mt-2'}
            >
              <View className={'flex-row items-center space-x-1'}>
                <Text className={'text-center text-black font-bold text-xl'}>
                  {1}
                </Text>
                <Text className={'text-center text-black/60 text-sm'}>
                  关注
                </Text>
              </View>
              <View className={'flex-row items-center space-x-1'}>
                <Text className={'text-center text-black font-bold text-xl'}>
                  {2}
                </Text>
                <Text className={'text-center text-black/60 text-sm'}>
                  粉丝
                </Text>
              </View>
              {/* TODO: 换些别的数据？🤔 */}
              <View className={'flex-row items-center space-x-1'}>
                <Text className={'text-center text-black font-bold text-xl'}>
                  {commentData?.pages[0].meta.totalItems}
                </Text>
                <Text className={'text-center text-black/60 text-sm'}>
                  帖子
                </Text>
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
                    <Text className={'px-2 py-0.5 text-[#333] text-xs'}>
                      {tag}
                    </Text>
                  )}
                </View>
              ))}
            </View>
            <View>
              <FollowButton
                followingId={data?.id!}
                style={'rounded py-[5px]'}
              />
            </View>
          </Animated.View>
          {/* <TabView renderTabBar={TabBar} tabs={tabs} /> */}
          <TabView
            renderTabBar={ProfileScreenTabBar}
            tabs={tabs}
            className={'border-t-[1px] border-black/5'}
          />
        </BottomSheet>
      </SafeAreaView>
    </LoadingScreen>
  )
}
