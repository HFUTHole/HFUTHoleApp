import { useFocusEffect } from '@react-navigation/native'
import { StatusBar, StatusBarStyle } from 'react-native'
import { MD3Theme, useTheme } from 'react-native-paper'

interface Options {
  barStyle?: StatusBarStyle
  themeKey?: keyof MD3Theme['colors']
  translucent?: boolean
  transparent?: boolean
}

export function useStatusBarStyle(options?: Options) {
  const theme = useTheme()

  useFocusEffect(() => {
    StatusBar.setBarStyle(options?.barStyle || 'dark-content')
    StatusBar.setBackgroundColor(
      theme.colors[options?.themeKey as keyof Options['themeKey']] ||
        options?.transparent
        ? 'transparent'
        : '#fff'
    )
    StatusBar.setTranslucent(!!options?.translucent)
  })
}
