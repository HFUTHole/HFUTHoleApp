import React, { useEffect, useRef } from 'react'
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view'
import { View } from 'native-base'
import { ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
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
import { MenuIcon } from '@/components/icon'

export interface HomeTabViewProps {}

type HomeTabProps = SceneRendererProps & {
  navigationState: NavigationState<{ key: string; title: string }>
}

const HomeTabBarRenderer: React.FC<HomeTabProps> = (props) => {
  const tabLayouts = useRef<{ index: number; width: number; x: number }[]>([])

  const layout = useWindowDimensions()
  const prevIndex = useRef(props.navigationState.index)
  const scrollViewRef = useRef<ScrollView>(null)
  // const indicatorLeft = useSharedValue(0)
  // const indicatorWidth = useSharedValue(30)

  useEffect(() => {
    const { index } = props.navigationState
    let scrollX = tabLayouts.current[index]?.x - layout.width / 3

    if (index < prevIndex.current) {
      scrollX = scrollX - layout.width / 3
    }

    prevIndex.current = index
    scrollViewRef.current?.scrollTo({ x: scrollX, animated: true })
  }, [props.navigationState.index, layout.width])

  // const indicatorStyle = useAnimatedStyle(() => {
  //   return {
  //     left: withTiming(indicatorLeft.value),
  //     width: withTiming(indicatorWidth.value),
  //   }
  // })

  return (
    <View className={'bg-white py-2 px-2'}>
      <ScrollView
        ref={scrollViewRef}
        className={'overflow-visible space-x-2'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {props.navigationState.routes.map((item, index) => {
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
              className={clsx([
                'justify-center',
                {
                  'pr-6': index === props.navigationState.routes.length - 1,
                },
              ])}
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
    <Animated.View
      className={'rounded-full px-4 py-2'}
      style={[
        {
          backgroundColor: activated ? 'rgba(0,0,0,0.03)' : 'transparent',
        },
      ]}
    >
      <Animated.Text
        className={clsx([
          {
            'font-bold': activated,
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
    follow: PostList,
    recommend: PostList,
    latest: PostList,
  } as const

  const RenderScene = SceneMap(sceneMap)

  const [routes] = React.useState([
    { key: 'follow', title: '关注' },
    { key: 'latest', title: '最新' },
    { key: 'recommend', title: '推荐' },
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
