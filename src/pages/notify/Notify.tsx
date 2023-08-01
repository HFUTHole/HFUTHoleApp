import { FlatList, StatusBar, View } from 'react-native'
import { Avatar, Text, TouchableRipple } from 'react-native-paper'
import { AtIcon, NotifyIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'
import { useMemo } from 'react'
import { Badge } from '@/components/Badge'
import { useNotifyRoute } from '@/shared/hooks/route/useNotifyRoute'
import { useStatusBarStyle } from '@/shared/hooks/useStatusBarStyle'

export function Notify() {
  useStatusBarStyle()

  const { data } = useBaseNotificationsQuery()

  const { goToInteraction, goToSystem } = useNotifyRoute()

  const list = useMemo(
    () => [
      {
        color: '#717DFE',
        title: '互动消息',
        body: data?.interaction?.data?.body || '暂时没有互动消息',
        icon: AtIcon,
        count: data?.interaction?.totalCount,
        onPress: goToInteraction,
      },
      {
        color: '#FF9F23',
        title: '通知',
        body: data?.system?.data?.body || '暂时没有通知',
        icon: NotifyIcon,
        count: data?.system?.totalCount,
        onPress: goToSystem,
      },
      {
        title: '班级团支书',
        body: '做一下青年大学习',
        img: 'https://c-ssl.duitang.com/uploads/blog/202208/08/20220808165611_1ba7f.jpeg',
        count: 0,
        onPress: goToInteraction,
      },
    ],
    [data]
  )

  return (
    <>
      <View className={'bg-white h-full'}>
        <FlatList
          data={list}
          ListFooterComponent={() => (
            <View className={'flex-1 items-center py-4'}>
              <SecondaryText>- 没有更多了 -</SecondaryText>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => item.onPress()}>
              <View className={'py-2 px-4 flex-row space-x-4 items-center'}>
                <View
                  className={'rounded-full flex items-center justify-center'}
                  style={{ backgroundColor: item.color, width: 60, height: 60 }}
                >
                  {item.icon ? (
                    <Avatar.Icon
                      icon={item.icon}
                      style={{
                        backgroundColor: item.color,
                      }}
                      color={'#fff'}
                      size={50}
                    />
                  ) : (
                    <Avatar.Image source={{ uri: item.img }} size={60} />
                  )}
                </View>
                <View className={'flex-1'}>
                  <Text variant={'bodyLarge'} className={'font-bold'}>
                    {item.title}
                  </Text>
                  <View>
                    <SecondaryText
                      variant={'bodyMedium'}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                    >
                      {item.body}
                    </SecondaryText>
                  </View>
                </View>
                {item.count && <Badge>{item.count}</Badge>}
              </View>
            </TouchableRipple>
          )}
        />
      </View>
    </>
  )
}
