import { Image, Text, View } from 'react-native'

export function HoleCategoryHeader() {
  return (
    <View className={'rounded-2xl overflow-hidden bg-black'}>
      <Image
        source={{
          uri: 'https://c-ssl.duitang.com/uploads/blog/202106/15/20210615110214_81507.jpg',
        }}
        className={'w-full h-36'}
        resizeMode={'cover'}
      />
      <View
        className={
          'absolute p-3 bg-black/20 left-0 right-0 top-0 bottom-0 flex justify-end'
        }
      >
        <Text className={'text-white text-2xl'}>吃喝玩乐</Text>
        <Text className={'text-white mt-2'}>学习已经很累了，吃点好的吧</Text>
      </View>
    </View>
  )
}
