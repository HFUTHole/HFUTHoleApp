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

const App = () => {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      // alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  })
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
