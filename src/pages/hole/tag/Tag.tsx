import { View, ScrollView } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { StarIcon } from '@/components/icon'
import { useMemo, useState } from 'react'
import { TabView } from '@/components/TabView'
import { useRoute } from '@react-navigation/native'
import clsx from 'clsx'
import {
  TagHoleInfo,
  type TagHoleInfoData,
} from '@/pages/hole/components/TagHoleInfo'

function PostList({ list }: { list: TagHoleInfoData[] }) {
  const oddList = useMemo(
    () => list.filter((_, index) => index % 2 === 0),
    [list],
  )
  const evenList = useMemo(
    () => list.filter((_, index) => index % 2 === 1),
    [list],
  )

  return (
    <ScrollView>
      <View className="flex flex-row space-x-2 px-2">
        <View className="flex-1">
          {oddList.map((item) => (
            <View className="my-2">
              <TagHoleInfo key={item.id} data={item} />
            </View>
          ))}
        </View>
        <View className="flex-1 space-y-2">
          {evenList.map((item) => (
            <View className="my-2">
              <TagHoleInfo key={item.id} data={item} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const list: TagHoleInfoData[] = [
  {
    favoriteCounts: 32,
    id: 1,
    imgs: ['https://lain.bgm.tv/pic/cover/l/75/c1/431767_bX7FZ.jpg'],
    isLiked: false,
    title: '2DMV 公开',
    user: {
      avatar:
        'https://note.yixiaojiu.top/assets/images/avatar-transparent-4bc42f140b025019b6a49878849392eb.png',
      username: '萝卜',
      createAt: '2022-12-12 22:22:22',
      id: 1,
    },
  },
  {
    favoriteCounts: 32,
    id: 2,
    imgs: ['https://lain.bgm.tv/pic/cover/l/75/c1/431767_bX7FZ.jpg'],
    isLiked: false,
    title: '2DMV 公开',
    user: {
      avatar:
        'https://note.yixiaojiu.top/assets/images/avatar-transparent-4bc42f140b025019b6a49878849392eb.png',
      username: '萝卜',
      createAt: '2022-12-12 22:22:22',
      id: 1,
    },
  },
  {
    favoriteCounts: 32,
    id: 3,
    imgs: ['https://lain.bgm.tv/pic/cover/l/75/c1/431767_bX7FZ.jpg'],
    isLiked: false,
    title: '2DMV 公开',
    user: {
      avatar:
        'https://note.yixiaojiu.top/assets/images/avatar-transparent-4bc42f140b025019b6a49878849392eb.png',
      username: '萝卜',
      createAt: '2022-12-12 22:22:22',
      id: 1,
    },
  },
  {
    favoriteCounts: 32,
    id: 4,
    imgs: ['https://lain.bgm.tv/pic/cover/l/75/c1/431767_bX7FZ.jpg'],
    isLiked: false,
    title: '2DMV 公开',
    user: {
      avatar:
        'https://note.yixiaojiu.top/assets/images/avatar-transparent-4bc42f140b025019b6a49878849392eb.png',
      username: '萝卜',
      createAt: '2022-12-12 22:22:22',
      id: 1,
    },
  },
  {
    favoriteCounts: 32,
    id: 5,
    imgs: ['https://lain.bgm.tv/pic/cover/l/75/c1/431767_bX7FZ.jpg'],
    isLiked: false,
    title: '2DMV 公开',
    user: {
      avatar:
        'https://note.yixiaojiu.top/assets/images/avatar-transparent-4bc42f140b025019b6a49878849392eb.png',
      username: '萝卜',
      createAt: '2022-12-12 22:22:22',
      id: 1,
    },
  },
]

function HotTagView() {
  return <PostList list={list} />
}

function NewTagView() {
  return <PostList list={list} />
}

interface TagProps {
  tag?: string
  viewCount?: string
  description?: string
  collected?: boolean
  onCollectChange?: (collected: boolean) => void
}

function Tag({
  tag = '',
  description = '',
  viewCount = '',
  collected = false,
  onCollectChange,
}: TagProps) {
  const handleCollectChange = () => {
    onCollectChange?.(!collected)
  }

  return (
    <View className="flex-1 w-full bg-white">
      <View className="px-4 my-4">
        <Text variant="headlineSmall">{`# ${tag}`}</Text>
        <View className="flex justify-between items-center flex-row">
          <Text>{`${viewCount}浏览`}</Text>
          <TouchableRipple onPress={handleCollectChange}>
            <View className="py-2 px-4 flex flex-row border border-gray-400 rounded-full space-x-1 items-center">
              <StarIcon color={collected ? '#facc15' : '#9ca3af'} size={16} />
              <Text
                className={`${collected ? 'text-yellow-400' : 'text-gray-400'}`}
              >
                {collected ? 'collects' : 'collected'}
              </Text>
            </View>
          </TouchableRipple>
        </View>
        <Text className="mt-2">{description}</Text>
      </View>
      <View className="h-[1px] bg-gray-400/50 mb-2"></View>
      <TabView
        renderTabBar={(props) => (
          <View className="flex flex-row px-4 space-x-4">
            {props.navigationState.routes.map((item, index) => (
              <Text
                key={item.key}
                className={clsx(
                  'text-base',
                  index === props.navigationState.index
                    ? 'text-gray-800'
                    : 'text-gray-400',
                )}
              >
                {item.title}
              </Text>
            ))}
          </View>
        )}
        tabs={[
          { key: 'hot', title: 'Hot', component: HotTagView },
          { key: 'new', title: 'New', component: NewTagView },
        ]}
      />
    </View>
  )
}

/**
 * example linkTo
 * linkTo('/hole/tag?tag=bar')
 */
export function TagScreen() {
  const [collected, setCollected] = useState(false)
  const route = useRoute()
  const params = route.params as { tag: string }
  const tag = params.tag
  const viewCount = '59.10k'
  const description = 'lorem loremloremloremloremloremloremloremloremloremlorem'

  return (
    <Tag
      tag={tag}
      viewCount={viewCount}
      description={description}
      collected={collected}
      onCollectChange={setCollected}
    />
  )
}
