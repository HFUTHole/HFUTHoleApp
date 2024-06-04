import React, { useEffect, useRef } from 'react'
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
} from 'react-native'
import { PostList } from '@/pages/home/component/PostList'
import Animated, {
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
      indicatorWidth.value = targetTab.width * 0.8
      indicatorOffset.value = targetTab.x + targetTab.width * 0.1
    }
  }, [props.navigationState.index, layout.width])

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(indicatorWidth.value),
      transform: [
        {
          translateX: withSpring(indicatorOffset.value),
        },
        {
          translateY: 15,
        },
      ],
      left: 0,
    }
  })

  const { goIndex } = useHoleSearchRoute()

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
        <Animated.View
          className={'absolute h-[3px] bg-[#FB264A] rounded-full'}
          style={[indicatorStyle]}
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
              <HomeTabBar key={item.key} activated={isActivated} data={item} />
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
        className={'h-full rounded-full px-3 flex-row items-center'}
        onPress={() => {
          goIndex()
        }}
      >
        <SearchIcon color={'#939496'} size={24} />
        {/* <View className={'flex-row items-center flex-1 '}>
            <Text className={'text-[#939496]'}>搜索...</Text>
          </View> */}
      </Pressable>
    </View>
  )
}

const HomeTabBar: React.FC<{
  activated: boolean
  data: { key: string; title: string }
}> = (props) => {
  const { activated, data } = props

  const textStyle = useAnimatedStyle(() => {
    return {
      fontSize: 16,
      color: activated ? '#333' : 'rgba(51,51,51,0.6)',
    }
  })

  return (
    <Animated.View className={'my-1 py-1 items-center'}>
      <Animated.Text
        className={clsx([
          {
            'font-bold text-primary/50': activated,
          },
        ])}
        style={[textStyle]}
      >
        {data.title}
      </Animated.Text>
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
