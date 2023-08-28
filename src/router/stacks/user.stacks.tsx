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
      statusBarTranslucent: true,
      statusBarColor: 'transparent',
    },
  },
  {
    name: 'edit-profile',
    component: EditProfileScreen,
    options: {
      title: '编辑个人信息',
      statusBarColor: '#fff',
      statusBarStyle: 'dark',
    },
  },
  {
    name: 'edit-username',
    component: EditUsernameScreen,
    options: {
      title: '更改用户名',
      statusBarColor: '#fff',
      statusBarStyle: 'dark',
    },
  },
  {
    name: 'settings',
    component: SettingsScreen,
    options: {
      title: '应用设置',
      statusBarColor: '#fff',
      statusBarStyle: 'dark',
    },
  },
  {
    name: 'about',
    component: AboutScreen,
    options: {
      title: '关于我们',
      statusBarColor: '#fff',
      statusBarStyle: 'dark',
    },
  },
  {
    name: 'comments',
    component: UserCommentScreen,
    options: {
      title: '发布的评论',
      statusBarColor: '#fff',
      statusBarStyle: 'dark',
    },
  },
  {
    name: 'draft',
    component: HoleDraftScreen,
    options: {
      title: '草稿箱',
      statusBarColor: '#fff',
      statusBarStyle: 'dark',
    },
  },
]

export const UserStacks = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        header: Header,
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
