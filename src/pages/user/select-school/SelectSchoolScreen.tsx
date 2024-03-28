import { useState } from 'react'
import { View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import { Text } from 'react-native-paper'
import { SearchInput } from '@/components/form/Search'
import { FieldErrors, useForm } from 'react-hook-form'
import { SearchIcon } from '@/components/icon'
import { SearchHeader } from '@/components/search/header'

interface School {
  name: string
  img: string
  avaiable: boolean
}

const schools = Array(8).fill({
  name: '合肥工业大学',
  img: 'https://th.bing.com/th?id=OSK.cf648732e246794611cf5447059bf022&w=46&h=46&c=11&rs=1&qlt=80&o=6&dpr=1.3&pid=SANGAM',
  avaiable: true,
}) as School[]

interface SchoolCard {
  onPress?: () => void
  school: School
}

const SchoolCard = ({ onPress, school }: SchoolCard) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white p-4 flex flex-row space-x-2"
    >
      <Image
        className="h-10 w-10"
        source={{
          uri: school.img,
        }}
      />
      <View className="flex-1">
        <Text variant="titleSmall">{school.name}</Text>
        {school.avaiable ? (
          <Text variant="bodySmall" className="text-green-400">
            已开通
          </Text>
        ) : (
          <Text variant="bodySmall" className="text-red-400">
            未开通
          </Text>
        )}
      </View>
    </Pressable>
  )
}

export function SelectSchoolScreen() {
  const [keyword, setKeyword] = useState('')

  return (
    <View>
      <SearchHeader
        onSubmit={() => {}}
        onChange={setKeyword}
        autoFocus={false}
      />
      <ScrollView>
        {keyword === '' ? (
          <View>
            <View>
              <Text className="px-4 py-1 text-gray-500">热门学校</Text>
              <View className="flex flex-row flex-wrap bg-white py-4">
                {schools.map((school, index) => (
                  <Pressable key={index} className="w-1/4" onPress={() => {}}>
                    <View className="w-full justify-center">
                      <Image
                        className="mx-auto h-10 w-10"
                        source={{
                          uri: school.img,
                        }}
                      />
                      <Text className="px-4 py-1">{school.name}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
            <View>
              <Text className="px-4 py-1 text-gray-500">当前选择</Text>
              <SchoolCard school={schools[0]} />
            </View>
            <View>
              <Text className="px-4 py-1 text-gray-500">已开通学校</Text>
              {schools.map((school, index) => (
                <SchoolCard school={school} key={index} />
              ))}
            </View>
          </View>
        ) : (
          <View>
            {schools.map((school, index) => (
              <SchoolCard school={school} key={index} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
