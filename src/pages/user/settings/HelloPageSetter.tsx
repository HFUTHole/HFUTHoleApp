import { Center, View } from 'native-base'
import { Text, FlatList, Button, Pressable } from 'react-native'
import { dispatch, store, useAppDispatch } from '@/store/store'
import { Page } from '@/shared/enums'
import { setHelloPage } from '@/store/reducer/user'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TouchableRipple } from 'react-native-paper'

interface PageData {
  label: string
  page: Page
}

const pageList: PageData[] = [
  {
    label: '首页',
    page: Page.hole,
  },
  {
    label: '课表',
    page: Page.spaceNested,
  },
  {
    label: '消息',
    page: Page.notifyNested,
  },
  {
    label: '我的',
    page: Page.userNested,
  },
]

export function PageIconButton(props: PageData) {
  const helloPage = useSelector((state) => state.user?.helloPage)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(helloPage === props.page)
  }, [helloPage, props.page])
  return (
    <View>
      <Center>
        <TouchableRipple
          onPress={() => {
            dispatch(setHelloPage(props.page))
          }}
        >
          <View
            className={`h-10 ml-1 mr-1 mb-0 w-12 pt-2
            border-b-4 ${isActive ? 'border-green-600' : 'border-transparent'}`}
          >
            <Center>
              <Text
                className={`${isActive ? 'text-green-600' : 'text-gray-400'}`}
              >
                {props.label}
              </Text>
            </Center>
          </View>
        </TouchableRipple>
      </Center>
    </View>
  )
}

export function HelloPageSetter() {
  return (
    <View
      className={
        'w-full relative z-0 px-4 py-5 bg-[#fff] rounded-2xl shadow-md mb-4 pb-0'
      }
    >
      <Center>
        <Text className={'mb-2 font-bold text-base'}>欢迎页</Text>
        <FlatList
          horizontal
          data={pageList}
          renderItem={({ item }) => (
            <PageIconButton
              key={item.label}
              label={item.label}
              page={item.page}
            />
          )}
          keyExtractor={(item) => item.label}
        />
      </Center>
    </View>
  )
}
