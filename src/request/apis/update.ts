import * as Updates from 'expo-updates'

export async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable) {
      alert(`UpdateID:${Updates?.updateId}\n加载更新中`)
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    }
  } catch (error) {
    alert(`更新失败:\n${error}`)
  }
}
