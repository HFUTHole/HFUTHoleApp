import React, { useEffect } from 'react'
import { PaperProvider } from '@/shared/providers/paper'
import { NavigationContainer } from '@react-navigation/native'
import { ReactQueryProvider } from '@/shared/providers/react-query'
import { NativeBaseProvider } from 'native-base'
import { HolePostContextProvider } from '@/shared/context/hole'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalProvider } from '@gorhom/portal'
import { KeyboardContextProvider } from '@/shared/context/keyboard'
import { BottomCommentContext } from '@/shared/context/hole/comment'
import { Layout } from '@/layouts/layout'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Updates from 'expo-updates'
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import Constants from "expo-constants";
import { request } from '@/request/request'
import { Linking, Platform } from 'react-native'
import * as FileSystem from 'expo-file-system'

const checkUpdate = async () => {
  const runtimeVersion = Constants.nativeAppVersion;
  const appVersion = await request<{
      latest_version: string;
      latest_url: string;
  }>({
    url: '/app/version',
    method: 'GET',
  })
  if (appVersion.latest_version !== runtimeVersion) {
    if (Platform.OS === 'android') {
      const { latest_url } = appVersion;
      const localUri = FileSystem.documentDirectory + `xfs-app-${appVersion.latest_version}.apk`;
      const downloadResumable = FileSystem.createDownloadResumable(
        latest_url,
        localUri, 
        {},
      );
      const result = await downloadResumable.downloadAsync();
      if (result) {
        await startActivityAsync("android.intent.action.INSTALL_PACKAGE", {
          data: await FileSystem.getContentUriAsync(localUri),
          type: 'application/vnd.android.package-archive',
        });
      }
    } else if (Platform.OS === 'ios') {
      // 跳转去AppStore
      const id = ``;
      const url = `itms-apps://apps.apple.com/cn/app/${id}`;
      Linking.openURL(url)
    }
  }
}

const App = () => {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (error) {
      // alert(`Error fetching latest Expo update: ${error}`)
    }
  }

  useEffect(() => {
    checkUpdate()
    onFetchUpdateAsync()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactQueryProvider>
          <SafeAreaProvider className={'flex-1'}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <PortalProvider>
                <PaperProvider>
                  <BottomCommentContext>
                    <NavigationContainer>
                      <KeyboardContextProvider>
                        <HolePostContextProvider>
                          <NativeBaseProvider>
                            <BottomSheetModalProvider>
                              <Layout />
                            </BottomSheetModalProvider>
                          </NativeBaseProvider>
                        </HolePostContextProvider>
                      </KeyboardContextProvider>
                    </NavigationContainer>
                  </BottomCommentContext>
                </PaperProvider>
              </PortalProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ReactQueryProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
