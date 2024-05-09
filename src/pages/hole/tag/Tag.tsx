import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { StarIcon } from '@/components/icon'
import { useState } from 'react'
import { TabView } from '@/components/TabView'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { useTagHotPostList, useTagNewPostList } from '@/swr/hole'
import { useRoute } from '@react-navigation/native'
import clsx from 'clsx'

function HotTagView() {
  // const query = useTagHotPostList()
  return (
    <View style={{ flex: 1 }}>{/* <RefreshableHoleList {...query} /> */}</View>
  )
}

function NewTagView() {
  // const query = useTagNewPostList()
  return (
    <View style={{ flex: 1 }}>{/* <RefreshableHoleList {...query} /> */}</View>
  )
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
        <Text variant="headlineSmall" className="my-4">{`# ${tag}`}</Text>
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
        <Text>{description}</Text>
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
