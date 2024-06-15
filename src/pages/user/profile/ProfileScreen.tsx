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
import { forwardRef, memo, useRef, useState } from 'react'
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

/**
 * 适合用于底部弹出的瀑布流列表
 */
export const BottomSheetMasonryList = memo((props: any) => {
  const { data } = props
  return (
    <View className="flex-1">
      <MasonryFlashList
        numColumns={2}
        estimatedItemSize={255}
        data={data}
        renderScrollComponent={BottomSheetScrollView}
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
        FlatListComponent={BottomSheetMasonryList}
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

// 简介
const ProfileBio = () => {
  const [viewMore, setViewMore] = useState(false)
  return (
    <View className={'flex-row space-x-2'}>
      {/* <Text className={'text-black text-xs'}>还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦 还没有简介哦</Text> */}
      <View className={'flex-1'}>
        <Text
          className={'text-white/75 text-s'}
          numberOfLines={viewMore ? undefined : 1}
        >
          还没有简介哦
        </Text>
      </View>
      <View>
        <Pressable onPress={() => setViewMore(!viewMore)}>
          <Text className={'text-[#1A91DA] text-s px-2 '}>
            {viewMore ? '收起' : '详情'}
          </Text>
        </Pressable>
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

export function ProfileScreen() {
  const { data, levelPercent } = useUserProfile()

  const { data: commentData } = useUserCommentsListQuery()

  const { goFollowingScreen } = useUserProfileRoute()

  const bottomSheetPosFrom = 60

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

  const infoHeight = useSharedValue(20)

  // 同步滚动移动
  const syncedTranslateY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollTimeline.value - infoHeight.value }],
    }
  })

  return (
    <LoadingScreen isLoading={false}>
      <ProfileScreenHeader scrollTimeline={scrollTimeline} />
      <Animated.View
        className={'absolute w-full top-[0]'}
        style={[animatedBgImgHeight]}
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

      <Animated.View
        className={'absolute w-100 h-100 z-[1] left-[16] right-[16]'}
        style={[syncedTranslateY]}
        onLayout={(e) => {
          infoHeight.value = e.nativeEvent.layout.height
        }}
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
            <ProfileBio />
          </View>

          <View className={'flex-row items-center space-x-2 mb-2'}>
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

          <View className={'flex-row items-center space-x-2 mb-2'}>
            {/* 板块 */}
            {/* 横向滚动 */}
            <ScrollView
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 8,
                gap: 8,
              }}
              horizontal={true}
            >
              {/*{blocks.map((block) => (*/}
              {/*  <View*/}
              {/*    key={block.id}*/}
              {/*    className={*/}
              {/*      'px-3 py-2 bg-white/20 rounded-3xl min-w-[80px] flex-column items-start justify-center'*/}
              {/*    }*/}
              {/*  >*/}
              {/*    <Text className={'text-white/80 text-sm'}>{block.name}</Text>*/}
              {/*    <Text className={'text-white/70 text-xs'}>*/}
              {/*      {block.description}*/}
              {/*    </Text>*/}
              {/*  </View>*/}
              {/*))}*/}
            </ScrollView>
          </View>
        </View>
      </Animated.View>
      <SafeAreaView className={'flex-1'}>
        <BottomSheet
          ref={bottomSheetRef as any}
          snapPoints={Array.from(
            { length: 120 - bottomSheetPosFrom },
            (_, i) => `${bottomSheetPosFrom + i}%`,
          )}
          animatedPosition={scrollTimeline}
          overDragResistanceFactor={10}
          // enableDynamicSizing={true}
          topInset={75}
          handleIndicatorStyle={{
            display: 'none',
          }}
          handleStyle={{
            padding: 0,
          }}
          // handleComponent={}
        >
          <TabView
            renderTabBar={(props) => (
              <ProfileScreenTabBar {...props} scrollTimeline={scrollTimeline} />
            )}
            tabs={tabs}
            className={'flex-1'}
          />
        </BottomSheet>
      </SafeAreaView>
    </LoadingScreen>
  )
}
