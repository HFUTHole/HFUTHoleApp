import { Routes } from '@/router/routes'
import { Alert, StatusBar, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import React, { ReactNode, useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { useQuery } from 'react-query'
import { getAppVersionRequest } from '@/request/apis/app'
import Constants from 'expo-constants'
import { Portal } from 'react-native-paper'
import { useBoolean } from 'ahooks'
import { Button } from '@/components/button'

import * as FileSystem from 'expo-file-system'
import * as Linking from 'expo-linking'
import { getQAQFont } from '@/shared/utils/utils'

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundCoflor: '#ff4081' }} />
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

/**
 * 对于IOS设备，可能不会检测StatusBar，所以需要渲染安全区
 * @param param0 子组件
 * @param topColor 顶部安全区背景颜色
 * @param bottomColor 底部安全区背景颜色
 * @returns 返回子组件
 */

export const PageWithSafeArea = (props: {
  children: ReactNode
  topStyle?: string
  bottomStyle?: string
}) => {
  return props.children
}

export function TabViewExample() {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

enum VersionTag {
  gt,
  eq,
  lt,
}

function compareVersion(version1: string, version2: string): number {
  const v1 = version1.split('.').map(Number)
  const v2 = version2.split('.').map(Number)

  const maxLen = Math.max(v1.length, v2.length)

  for (let i = 0; i < maxLen; i++) {
    const i1 = v1[i] || 0
    const i2 = v2[i] || 0

    if (i1 > i2) {
      return VersionTag.gt
    } else if (i1 < i2) {
      return VersionTag.lt
    }
  }

  return VersionTag.eq
}

const Updater = (props: { url: string }) => {
  const [downloadProgress, setDownloadProgress] = useState(0)

  const downloadApk = async () => {
    const uri = props.url // APK文件的URL
    const fileUri = FileSystem.documentDirectory + `小肥书${Date.now()}.apk`

    const downloadResumable = FileSystem.createDownloadResumable(
      uri,
      fileUri,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite
        setDownloadProgress(progress)
      },
    )

    try {
      const result = await downloadResumable.downloadAsync()
      console.log('Finished downloading to ', result.uri)
      // 此处可以添加打开APK文件的逻辑
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Portal>
      <View
        className={'w-screen h-full bg-black/50 justify-center items-center'}
      >
        <View className={'bg-white rounded-lg p-2 min-w-[80vw]'}>
          <Text>发现新版本</Text>
          <View>
            <Button onPress={downloadApk}>下载</Button>
            <Text>
              Download Progress: {Math.round(downloadProgress * 100)}%
            </Text>
          </View>
        </View>
      </View>
    </Portal>
  )
}

export function Layout() {
  //   useQuery({
  //     queryKey: ['app.version2'],
  //     queryFn: getAppVersionRequest,
  //     onSuccess(data) {
  //       const runtimeVersion = Constants.manifest2?.runtimeVersion
  //       const isLt =
  //         compareVersion(runtimeVersion || '', data.latest_version) ===
  //         VersionTag.lt
  //
  //       if (isLt && runtimeVersion === '1.0.0') {
  //         Alert.alert(
  //           '发现新版本',
  //           `亲爱的同学，非常抱歉，由于一些技术上的疏忽，导致这次更新必须要手动下载安装
  // 点击确定后将会跳转到下载页面，私密马赛🙇🙇🙇${getQAQFont('sadness')}，
  // 如果浏览器打开失败就复制${data.latest_url}
  // 或者加群813152217获取最新安装包`,
  //           [
  //             {
  //               text: '确定',
  //               onPress() {
  //                 Linking.openURL(data.latest_url)
  //               },
  //             },
  //           ],
  //         )
  //       }
  //     },
  //   })

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View className={'flex-1 bg-black'}>
        <Routes />
        <Toast />
      </View>
    </>
  )
}
