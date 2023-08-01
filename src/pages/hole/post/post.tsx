import { HolePostBody } from '@/pages/hole/post/body'
import { HolePostContextProvider } from '@/shared/context/hole'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useStatusBarContext } from '@/shared/context/statusbar'

export function HolePost() {
  const theme = useTheme()

  return (
    <HolePostContextProvider>
      <View
        className={'h-screen'}
        style={{ backgroundColor: theme.colors.background }}
      >
        <HolePostBody />
      </View>
    </HolePostContextProvider>
  )
}
