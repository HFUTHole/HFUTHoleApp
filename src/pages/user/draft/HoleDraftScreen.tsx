import { FlatList, View } from 'react-native'
import { useAppSelector } from '@/store/store'
import { Button, Text, TouchableRipple } from 'react-native-paper'
import { copyToClipboard } from '@/shared/utils/keyboard'
import { Toast } from '@/shared/utils/toast'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'

export function HoleDraftScreen() {
  const draft = useAppSelector((state) => state.hole.draft)

  const copyDraft = (body: string) => {
    copyToClipboard(body)
    Toast.success({
      text1: '复制成功',
    })
  }

  return (
    <SafeAreaView className={'px-[2.5vw] bg-white flex-1'}>
      <BackHeader title={'草稿箱'} />
      <FlatList
        data={draft}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View className={'rounded-lg mt-2 overflow-hidden'}>
              <TouchableRipple
                className={'px-2 py-3 bg-white rounded-lg'}
                onLongPress={() => copyDraft(item)}
              >
                <View className={'flex-row justify-between items-center'}>
                  <Text
                    className={'w-10/12'}
                    numberOfLines={4}
                    ellipsizeMode={'tail'}
                  >
                    {item}
                  </Text>
                  <Button onPress={() => copyDraft(item)}>复制</Button>
                </View>
              </TouchableRipple>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
