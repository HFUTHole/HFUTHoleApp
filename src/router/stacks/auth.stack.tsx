import { Login } from '@/pages/auth/login'
import { Register } from '@/pages/auth/register'
import { Forget } from '@/pages/auth/forget'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'native-base'
import { Header } from '@/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const AuthStack = createNativeStackNavigator()

export const AuthStacks = () => {
  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: true,
          header: Header,
        }}
      >
        <AuthStack.Screen name={'login'} component={Login} />
        <AuthStack.Screen
          name={'register'}
          component={Register}
          options={{ title: '注册' }}
        />
        <AuthStack.Screen
          name={'forget'}
          component={Forget}
          options={{ title: '找回密码' }}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  )
}
