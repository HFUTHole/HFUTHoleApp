import { View } from 'react-native'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useUserFavoriteHoleList, useUserPostedHoleList } from '@/swr/user/hole'
import { useUserProfile } from '@/swr/user/profile'
import { type ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { MyAvatar } from '@/components/UserAvatar'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import { PrimaryText } from '@/components/Text/PrimaryText'
import { UserLevelBar } from '@/pages/user/components/UserLevelBar'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabBar } from 'react-native-tab-view'

const UserHoleList = () => {
  const query = useUserPostedHoleList()
  return (
    <View style={{ flex: 1 }}>
      <RefreshableHoleList {...query} FlatListComponent={BottomSheetFlatList} />
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

const tabs: ITabViewTabs[] = [
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
  const { data, levelPercent } = useUserProfile()

  const bottomSheetRef = useRef<BottomSheetMethods>()

  return (
    <LoadingScreen isLoading={false}>
      <View className={'absolute w-full h-[40%]'}>
        <Image
          className={'absolute w-full h-[100%]'}
          source={{
            uri: 'https://sns-webpic-qc.xhscdn.com/202405061210/5fb8885e657bd26fb99c354b679db747/1040g008312dl9l8d68005pf9j681969uhp7c0eo!nc_n_webp_mw_1',
          }}
        />
        <View className={'absolute w-full h-[100%] z-[1] bg-black/20'} />
      </View>
      <SafeAreaView className={'flex-1'}>
        <View className={'px-[2.5vw] space-y-4'}>
          <View className={'flex-row items-center'}>
            <MyAvatar size={100} />
            <View className={'ml-4 justify-center space-y-1'}>
              <Text className={'text-white font-bold text-[20px]'}>
                {data?.username}
              </Text>
              <Text className={'text-xs text-white/70'}>
                小肥书UID：{data?.id}
              </Text>
            </View>
          </View>
          <View>
            <Text className={'text-white text-xs'}>还没有简介哦</Text>
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['70%', '85%']}
          handleIndicatorStyle={{
            display: 'none',
          }}
        >
          <TabView renderTabBar={TabBar} tabs={tabs} />
        </BottomSheet>
      </SafeAreaView>
    </LoadingScreen>
  )
}
