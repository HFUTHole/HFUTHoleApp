import React, { useEffect, useRef, useState } from 'react'
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view'
import { View } from 'native-base'
import {
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  Animated as ReactNativeAnimated,
} from 'react-native'
import { PostList } from '@/pages/home/component/PostList'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Categories } from '@/shared/constants/category'
import clsx from 'clsx'
import { MenuIcon, SearchIcon } from '@/components/icon'
import { FollowedPostList } from '@/pages/home/FollowedPostList'
import { MyAvatar } from '@/components/UserAvatar'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { MarketScreen } from '../market/MarketScreen'

export interface HomeTabViewProps {}

type HomeTabProps = SceneRendererProps & {
  navigationState: NavigationState<{ key: string; title: string }>
}

const HomeTabBarRenderer: React.FC<HomeTabProps> = (props) => {
  const tabLayouts = useRef<{ index: number; width: number; x: number }[]>([])

  const layout = useWindowDimensions()
  const prevIndex = useRef(props.navigationState.index)
  const scrollViewRef = useRef<ScrollView>(null)
  const indicatorOffset = useSharedValue(0)
  const indicatorWidth = useSharedValue(0)

  // const indicatorLeft = useSharedValue(0)

  useEffect(() => {
    const { index } = props.navigationState
    let scrollX = tabLayouts.current[index]?.x - layout.width / 3

    if (index < prevIndex.current) {
      scrollX = scrollX - layout.width / 3
    }

    prevIndex.current = index
    scrollViewRef.current?.scrollTo({ x: scrollX, animated: true })

    const targetTab = tabLayouts.current[index]
    if (targetTab) {
    }
  }, [props.navigationState.index, layout.width])

  const { goIndex } = useHoleSearchRoute()

  const [animatedTranslateX, setAnimatedTranslateX] = useState<
    ReactNativeAnimated.AnimatedInterpolation<number>
  >(
    props.position.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [123.92727203369141, 123.92727203369141, 123.92727203369141],
    }),
  )
  const [animatedWidth, setAnimatedWidth] = useState<
    ReactNativeAnimated.AnimatedInterpolation<number>
  >(
    props.position.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0.256, 0.256, 0.256],
    }),
  )

  return (
    <View className={'flex-row items-center bg-white py-2 px-2'}>
      <TouchableOpacity onPress={() => {}}>
        <MyAvatar size={35} />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        className={'overflow-visible flex-1 mb-2 ml-7'}
        horizontal={true}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ReactNativeAnimated.View
          className={'absolute h-[3px] w-[100px] l-0 bg-[#FB264A] rounded-full'}
          style={[
            {
              transform: [
                {
                  translateX: animatedTranslateX,
                },
                {
                  scaleX: animatedWidth,
                },
                {
                  translateY: 16,
                },
              ],
              transformOrigin: 'left center',
              left: 0,
            },
          ]}
        />
        {props.navigationState.routes.map((item, index, arr) => {
          const isActivated = props.navigationState.index === index

          return (
            <TouchableOpacity
              onPress={() => {
                props.jumpTo(item.key)
              }}
              onLayout={(event) => {
                const { width, x } = event.nativeEvent.layout

                const isExist = tabLayouts.current.find(
                  (item) => item.index == index,
                )

                if (!isExist) {
                  tabLayouts.current.push({
                    index,
                    width,
                    x,
                  })
                  tabLayouts.current.sort((a, b) => a.index - b.index)
                  if (tabLayouts.current.length === arr.length) {
                    setAnimatedTranslateX(
                      props.position.interpolate({
                        inputRange: tabLayouts.current.map(
                          (item) => item.index,
                        ),
                        outputRange: tabLayouts.current.map(
                          (item) => item.x + 0.1 * item.width,
                        ),
                      }),
                    )
                    setAnimatedWidth(
                      props.position.interpolate({
                        inputRange: tabLayouts.current.map(
                          (item) => item.index,
                        ),
                        outputRange: tabLayouts.current.map(
                          (item) => (item.width / 100) * 0.8,
                        ),
                      }),
                    )
                  }
                } else {
                  isExist.x = x
                  isExist.width = width
                  isExist.index = index
                }
              }}
              className={clsx({
                'justify-center': true,
                'mr-10': index !== arr.length - 1,
              })}
            >
              <HomeTabBar
                key={item.key}
                data={item}
                position={props.position}
                index={index}
                tabsCount={arr.length}
              />
            </TouchableOpacity>
          )
        })}
        {/*<Animated.View*/}
        {/*  // style={[indicatorStyle]}*/}
        {/*  className={*/}
        {/*    'absolute left-0 w-[30px] h-1 rounded-full bg-black bottom-[-7px]'*/}
        {/*  }*/}
        {/*/>*/}
      </ScrollView>
      <Pressable
        className={'h-full rounded-full px-3 flex-row items-center '}
        onPress={() => {
          goIndex()
        }}
      >
        <View className="min-w-[24px]">
          <SearchIcon color={'#939496'} size={24} />
        </View>
        {/* <View className={'flex-row items-center flex-1 '}>
            <Text className={'text-[#939496]'}>搜索...</Text>
          </View> */}
      </Pressable>
    </View>
  )
}

const HomeTabBar: React.FC<{
  data: { key: string; title: string }
  position: ReactNativeAnimated.AnimatedInterpolation<number>
  index: number
  tabsCount: number
}> = (props) => {
  const { data, position, index, tabsCount } = props

  const inputRange = Array.from({ length: tabsCount }, (_, i) => i)

  const opacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map((inputIndex) =>
      inputIndex === index ? 1 : 0.6,
    ),
  })

  return (
    <Animated.View className={'my-1 py-1 items-center'}>
      <ReactNativeAnimated.Text
        className={'font-bold text-primary/50 text-[16px] text-[#333]'}
        style={{
          opacity,
        }}
      >
        {data.title}
      </ReactNativeAnimated.Text>
    </Animated.View>
  )
}

export const HomeTabView: React.FC<HomeTabViewProps> = () => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(1)

  const sceneMap = {
    follow: FollowedPostList,
    latest: PostList,
    market: MarketScreen,
  } as const

  const RenderScene = SceneMap(sceneMap)

  const [routes] = React.useState([
    { key: 'follow', title: '关注' },
    { key: 'latest', title: '最新' },
    { key: 'market', title: '淘二手' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={HomeTabBarRenderer}
      renderScene={RenderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
