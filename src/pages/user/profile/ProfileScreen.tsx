import { Image, useWindowDimensions, View, StatusBar } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserFavoriteHoleList, useUserPostedHoleList } from '@/swr/user/hole'
import { useUserProfile } from '@/swr/user/profile'
import { Tabs, type Tab } from '@/pages/user/profile/Tabs'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { MyAvatar } from '@/components/UserAvatar'
import { Text, TouchableRipple } from 'react-native-paper'
import { PrimaryText } from '@/components/Text/PrimaryText'
import { UserLevelBar } from '@/pages/user/components/UserLevelBar'

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

  return (
    <LoadingScreen isLoading={isLoading}>
      <StatusBar backgroundColor={'transparent'} translucent />
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
        <Tabs tabs={tabs} />
      </View>
    </LoadingScreen>
  )
}
