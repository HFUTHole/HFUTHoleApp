import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'
import { RightIcon } from '@/components/icon'
import { useMemo } from 'react'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useUserProfile } from '@/swr/user/profile'
import { EditProfileAvatar } from '@/pages/user/profile/edit/EditProfileAvatar'
import { ProfileItemType } from '@/pages/user/profile/edit/singal'
import { useEventEmitter } from 'ahooks'
import { EditProfileUsername } from '@/pages/user/profile/edit/EditProfileUsername'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'

export function EditProfileContent() {
  const { data } = useUserProfile()

  const event$ = useEventEmitter<ProfileItemType>()

  const EditProfileItems = useMemo(() => {
    return [
      {
        text: '头像',
        component: <EditProfileAvatar event={event$} />,
        onPress: () => {
          event$.emit('avatar')
        },
      },
      {
        text: '名字',
        component: <EditProfileUsername event={event$} />,
        onPress: () => {
          event$.emit('username')
        },
      },
      {
        text: 'UID',
        component: <SecondaryText>{data!.id}</SecondaryText>,
      },
    ]
  }, [data, event$])

  return (
    <SafeAreaView className={'p-4 bg-white space-y-4'}>
      <BackHeader title={'编辑资料'} />
      {EditProfileItems.map((item) => (
        <Pressable onPress={item.onPress} key={item.text}>
          <View
            className={
              'flex flex-row justify-between p-2 border-b-[1px[ border-black/10 items-center'
            }
          >
            <Text variant={'titleSmall'}>{item.text}</Text>
            <View className={'flex-row space-x-2 items-center'}>
              <View>{item.component}</View>
              <RightIcon />
            </View>
          </View>
        </Pressable>
      ))}
    </SafeAreaView>
  )
}
