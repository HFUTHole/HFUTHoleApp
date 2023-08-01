import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { useAuth } from '@/shared/hooks/useAuth'
import { AuthStacks } from '@/router/stacks/auth.stack'
import { IndexStacks } from '@/router/stacks/index.stack'

const Stack = createNativeStackNavigator()

export const Routes = () => {
  const { isLogin } = useAuth()

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <>
            <Stack.Screen name={'index'} component={IndexStacks} />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name={'auth'}
            component={AuthStacks}
          />
        )}
        <Stack.Screen name={'web-view'} component={WebViewPage} />
      </Stack.Navigator>
    </>
  )
}
