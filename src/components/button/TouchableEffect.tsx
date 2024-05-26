import { App } from '@/shared/utils/App'
import { TouchableRipple } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'

export const TouchableEffect = App.isAndroid
  ? TouchableRipple
  : TouchableOpacity
