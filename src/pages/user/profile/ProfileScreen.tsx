import { Image, View, StatusBar } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserFavoriteHoleList, useUserPostedHoleList } from '@/swr/user/hole'
import { useUserProfile } from '@/swr/user/profile'
import { TabView, type Tab } from '@/components/TabView'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { MyAvatar } from '@/components/UserAvatar'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import { PrimaryText } from '@/components/Text/PrimaryText'
import { UserLevelBar } from '@/pages/user/components/UserLevelBar'
import { useCallback } from 'react'
import { TabBar } from 'react-native-tab-view'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import { useStatusBarStyle } from '@/shared/hooks/useStatusBarStyle'

const UserHoleList = () => {
  const query = useUserPostedHoleList()
  return (
    <View style={{ flex: 1 }}>
      <RefreshableHoleList {...query} />
    </View>
  )
}

const UserFavoriteHoleList = () => {
  const query = useUserFavoriteHoleList()
  return (
    <View style={{ flex: 1 }}>
      <RefreshableHoleList {...query} />
    </View>
  )
}

const tabs: Tab[] = [
  {
    key: 'user-hole',
    title: '发表',
    component: UserHoleList,
  },
  {
    key: 'user-favorite-hole',
    title: '喜欢',
    component: UserFavoriteHoleList,
  },
]

export function ProfileScreen() {
  const { isLoading } = useUserPostedHoleList()
  const { data: userData } = useUserProfile()
  const theme = useTheme()

  const route = useUserProfileRoute()

  const renderTabBar = useCallback(
    (props: any) => {
      return (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: theme.colors.primary }}
          inactiveColor={theme.colors.surfaceVariant}
          activeColor={theme.colors.primary}
          style={{
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
            shadowColor: 'white',
          }}
        />
      )
    },
    [theme.colors]
  )

  useStatusBarStyle({
    translucent: true,
    transparent: true,
  })

  return (
    <LoadingScreen isLoading={isLoading}>
      <View className="flex-1 w-full">
        <Image
          className={'w-full h-40'}
          source={{
            uri: 'https://img.3dmgame.com/uploads/images/news/20211101/1635781777_229109.jpg',
          }}
          style={{
            resizeMode: 'cover',
          }}
        />
        <View className={'w-full bg-white px-4 pb-2'}>
          <View className={'flex flex-row justify-between items-center '}>
            <View className={'top-[-20px]'}>
              <MyAvatar size={80} />
            </View>
            <TouchableRipple
              className={
                'border-primary border-[1px] items-center justify-center rounded-lg h-10 px-14'
              }
              onPress={route.goEditScreen}
            >
              <PrimaryText>编辑资料</PrimaryText>
            </TouchableRipple>
          </View>
          <View className={'flex space-y-2'}>
            <View>
              <Text variant={'titleLarge'}>{userData?.username}</Text>
            </View>
            <View className={'w-1/3'}>
              <UserLevelBar />
            </View>
          </View>
        </View>
        <TabView renderTabBar={renderTabBar} tabs={tabs} />
      </View>
    </LoadingScreen>
  )
}
