import { Pressable, View } from 'react-native'
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
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabBar } from 'react-native-tab-view'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useUserCommentsListQuery } from '@/swr/user/comment'

const UserHoleList = () => {
  const query = useUserPostedHoleList()
  return (
    <View style={{ flex: 1 }}>
      <RefreshableHoleList {...query} FlatListComponent={BottomSheetFlatList} />
    </View>
  )
}

const UserFavoriteHoleList = () => {
  const query = useUserFavoriteHoleList()
  return (
    <View style={{ flex: 1 }}>
      <RefreshableHoleList {...query} />
    </View>
  )
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
}> = ({ scrollTimeline }) => {
  const { data } = useUserProfile()
  const navigation = useNavigation()
  // Header 背景透明度
  const animatedOpacity = useAnimatedStyle(() => {
    const fromAt = 70
    const toAt = 120
    const opacity = 1 - (scrollTimeline.value - fromAt) / (toAt - fromAt)
    return {
      opacity: Math.min(1, Math.max(0, opacity)),
    }
  })
  const animatedNameOpacity = useAnimatedStyle(() => {
    const fromAt = -50
    const toAt = 30
    const opacity = 1 - (scrollTimeline.value - fromAt) / (toAt - fromAt)
    return {
      opacity: Math.min(1, Math.max(0, opacity)),
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
      <Appbar.BackAction onPress={() => navigation.goBack()} color={'#333'} />
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
          backgroundColor: '#5B9BD5',
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
  const [viewMore, setViewMore] = useState(false)
  return (
    <View className={'flex-row space-x-2'}>
      {/* <Text className={'text-black text-xs'}>还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦</Text> */}
      <View className={'flex-1'}>
        <Text
          className={'text-black text-xs'}
          numberOfLines={viewMore ? undefined : 1}
        >
          还没有简介哦
        </Text>
      </View>
      <View>
        <Pressable onPress={() => setViewMore(!viewMore)}>
          <Text className={'text-[#5B9BD5] text-xs px-2 '}>
            {viewMore ? '收起' : '详情'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export function ProfileScreen() {
  const { data, levelPercent } = useUserProfile()

  const { data: commentData } = useUserCommentsListQuery()

  const userProfileRoute = useUserProfileRoute()

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

  // 同步滚动移动
  const syncedTranslateY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollTimeline.value }],
    }
  })

  return (
    <LoadingScreen isLoading={false}>
      <ProfileScreenHeader scrollTimeline={scrollTimeline} />
      <Animated.View
        className={'absolute w-full top-[0]'}
        style={[animatedBgImgHeight]}
      >
        <Image
          className={'absolute w-full h-[100%] top-[0]'}
          source={{
            // TODO: 替换占位图
            uri: 'https://c-ssl.duitang.com/uploads/blog/202206/20/20220620110826_42704.jpg',
          }}
          contentPosition={'center'}
          cachePolicy={'disk'}
        />
      </Animated.View>

      <Animated.View
        className={'absolute w-100 h-100 z-[1] top-[-40] left-[16]'}
        style={[syncedTranslateY]}
      >
        <MyAvatar size={100} />
      </Animated.View>
      <Animated.View
        className={'absolute w-100 h-100 z-[1] top-[-25] right-[16]'}
        style={[syncedTranslateY]}
      >
        <View
          className={'flex-row items-center bg-white/60 px-1 py-0.5 rounded-sm'}
        >
          <Text className={'text-xs text-black/70'}>小肥书UID: {data?.id}</Text>
        </View>
      </Animated.View>
      <SafeAreaView className={'flex-1'}>
        <BottomSheet
          ref={bottomSheetRef as any}
          snapPoints={Array.from({ length: 35 }, (_, i) => `${65 + i}%`)}
          animatedPosition={scrollTimeline}
          overDragResistanceFactor={10}
          // enableDynamicSizing={true}
          topInset={-120}
          handleIndicatorStyle={{
            display: 'none',
          }}
          handleStyle={{
            padding: 2,
          }}
        >
          <Animated.View className={'px-[2.5vw] space-y-4 mb-4 '} style={{}}>
            <View
              className={'flex-row justify-around align-center ml-[120] py-2'}
            >
              <View
                className={
                  'flex-col align-center flex-1 border-r-[1px] border-black/5'
                }
              >
                <Text
                  className={'text-center text-black font-bold text-[20px]'}
                >
                  {1}
                </Text>
                <Text className={'text-center text-black/80 text-[16px]'}>
                  关注
                </Text>
              </View>
              <View
                className={
                  'flex-col align-center flex-1 border-r-[1px] border-black/5'
                }
              >
                <Text
                  className={'text-center text-black font-bold text-[20px]'}
                >
                  {2}
                </Text>
                <Text className={'text-center text-black/80 text-[16px]'}>
                  粉丝
                </Text>
              </View>
              {/* TODO: 换些别的数据？🤔 */}
              <View className={'flex-col align-center flex-1'}>
                <Text
                  className={'text-center text-black font-bold text-[20px]'}
                >
                  {commentData?.pages[0].meta.totalItems}
                </Text>
                <Text className={'text-center text-black/80 text-[16px]'}>
                  帖子
                </Text>
              </View>
            </View>
            <View className={'flex-row justify-between items-center'}>
              <View className={'ml-1 justify-center'}>
                <Text className={'text-black font-bold text-[20px]'}>
                  {data?.username}
                </Text>
              </View>
              <View>
                <Button
                  mode="outlined"
                  textColor="black"
                  onPress={() => {
                    userProfileRoute.goEditScreen()
                  }}
                  className={`shadow-none w-full py-0 rounded-full`}
                  theme={{ version: 2, isV3: false }}
                >
                  编辑资料
                </Button>
              </View>
            </View>
            <View className={'flex-row justify-start'}>
              <UserLevelBar percent={levelPercent} {...data?.level} />
            </View>
            <View>
              <ProfileBio />
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
