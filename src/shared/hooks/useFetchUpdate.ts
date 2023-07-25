import * as Updates from 'expo-updates'
import { Alert } from 'react-native'

export async function useFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable) {
      Alert.alert('更新中', `更新ID：${update.manifest?.id}`, [
        {
          text: '确定',
        },
      ])
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    }
  } catch (error) {
    Alert.alert('更新失败', `错误信息：\n${error}`, [
      {
        text: '确定',
      },
    ])
  }
}
