import { ProfileScreen } from '@/pages/user/profile/ProfileScreen'
import { EditProfileScreen } from '@/pages/user/profile/edit/EditProfileScreen'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import React from 'react'
import { Header } from '@/components/Header'
import { EditUsernameScreen } from '@/pages/user/profile/edit/EditProfileUsername'
import { AboutScreen } from '@/pages/user/about/AboutScreen'
import { SettingsScreen } from '@/pages/user/settings/SettingsScreen'
import { UserCommentScreen } from '@/pages/user/comment/UserCommentScreen'
import { HoleDraftScreen } from '@/pages/user/draft/HoleDraftScreen'
import { SelectSchoolScreen } from '@/pages/user/select-school/SelectSchoolScreen'
import { useParams } from '@/shared/hooks/useParams'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OtherUserProfileScreen } from '@/pages/user/profile/OtherUserProfile'
import { UserFollowingScreen } from '@/pages/user/following/Following'
import { EditProfileDesc } from '@/pages/user/profile/edit/EditProfileDesc'

const UserStack = createNativeStackNavigator()

export type Screen = {
  name: string
  component: React.FunctionComponent
  options?: NativeStackNavigationOptions
}

const UserScreens: Screen[] = [
  {
    name: 'profile',
    component: ProfileScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'other-profile',
    component: OtherUserProfileScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'edit-profile',
    component: EditProfileScreen,
    options: {
      title: '编辑个人信息',
    },
  },
  {
    name: 'edit-username',
    component: EditUsernameScreen,
    options: {
      title: '更改用户名',
    },
  },
  {
    name: 'edit-desc',
    component: EditProfileDesc,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'settings',
    component: SettingsScreen,
    options: {
      title: '应用设置',
    },
  },
  {
    name: 'about',
    component: AboutScreen,
    options: {
      title: '关于我们',
    },
  },
  {
    name: 'comments',
    component: UserCommentScreen,
    options: {
      title: '发布的评论',
    },
  },
  {
    name: 'draft',
    component: HoleDraftScreen,
    options: {
      title: '草稿箱',
    },
  },
  {
    name: 'following',
    component: UserFollowingScreen,
    options: {
      headerShown: false,
    },
  },
  // {
  //   name: 'select-school',
  //   component: SelectSchoolScreen,
  //   options: {
  //     title: '选择学校',
  //   },
  // },
]

const excludeSafeAreaScreens = ['profile', 'other-profile']

export const UserStacks = () => {
  const { screen } = useParams<{ screen: string }>()

  const isExcludeSafeAreaScreen = excludeSafeAreaScreens.find(
    (item) => item === screen,
  )
  const ViewComponent = isExcludeSafeAreaScreen ? View : SafeAreaView
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {UserScreens.map((screen) => (
        <UserStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </UserStack.Navigator>
  )
}
