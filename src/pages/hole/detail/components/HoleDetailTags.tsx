import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useHoleRoute } from '@/shared/hooks/route/useHoleRoute'

interface HoleDetailTagsProps {
  data: {
    tags: { body: string }[]
  }
}

export const HoleDetailTags: React.FC<HoleDetailTagsProps> = (props) => {
  const { data } = props

  const holeRoute = useHoleRoute()

  return (
    <View className={'flex-row space-x-1'}>
      {data.tags.map((tag) => {
        return (
          <Pressable
            key={tag.id}
            onPress={() => {
              holeRoute.goTag({
                tag: tag.body,
              })
            }}
          >
            <Text className={'text-link'}>#{tag.body}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}
