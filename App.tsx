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
      // alert(`Error fetching latest Expo update: ${error}`)
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactQueryProvider>
          <SafeAreaProvider className={'flex-1'}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <PaperProvider>
                <NavigationContainer>
                  <KeyboardContextProvider>
                    <HolePostContextProvider>
                      <NativeBaseProvider>
                        <PortalProvider>
                          <BottomSheetModalProvider>
                            <Layout />
                          </BottomSheetModalProvider>
                        </PortalProvider>
                      </NativeBaseProvider>
                    </HolePostContextProvider>
                  </KeyboardContextProvider>
                </NavigationContainer>
              </PaperProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ReactQueryProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
