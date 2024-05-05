import React from 'react'
import { Text, View } from 'react-native'

interface HoleDetailTagsProps {
  data: IHoleDetailResponse
}

export const HoleDetailTags: React.FC<HoleDetailTagsProps> = (props) => {
  const { data } = props

  return (
    <View className={'flex-row space-x-1'}>
      {data.tags.map((tag) => {
        return (
          <Text key={tag.body} className={'text-link'}>
            #{tag.body}
          </Text>
        )
      })}
    </View>
  )
}
