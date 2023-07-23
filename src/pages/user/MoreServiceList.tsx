import { Button, View } from 'react-native'
import { Svg } from '@/components/svg/Svg'
import SettingSvg from '@/assets/svg/setting.svg'
import AboutSvg from '@/assets/svg/user/about.svg'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { RightIcon } from '@/components/icon'
import * as Updates from 'expo-updates'

const List = [
  {
    icon: SettingSvg,
    title: '应用设置',
    route: '',
  },
  {
    icon: AboutSvg,
    title: '关于应用',
    route: '',
  },
]

export function MoreServiceList() {
  async function onFetchUpdateAsync() {
    alert(
      `CurrentChannel:${Updates?.releaseChannel}\nCurrentRuntimeVersion:${Updates?.manifest?.runtimeVersion}\nCurrentID:urrentRuntimeVersion:${Updates?.updateId}`
    )
    try {
      const update = await Updates.checkForUpdateAsync()
      alert(
        `IsAvailable:${update.isAvailable}\nUpdateManifest:${update.manifest}\nID:${update.manifest?.id}\nMetadata:${update.manifest?.metadata}\nRuntimeVersion:${update.manifest?.runtimeVersion}`
      )
      if (update.isAvailable) {
        alert(`updateID:${Updates?.updateId}`)
        alert('update.isAvailable:true')
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`)
      const logEntries = await Updates.readLogEntriesAsync()
      let logString = ``
      for (let entry of logEntries) {
        logString += `[${entry.timestamp.toString()}] ${entry.message}`
      }
      alert(`${logString}`)
    }
  }

  const eventListener = (event) => {
    alert(`Event FIRES ${event}`)
    if (event.type === Updates.UpdateEventType.ERROR) {
      // Handle error
      alert('UPDATE ERROR')
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      // Handle no update available
      alert('UPDATE NO_UPDATE_AVAILABLE')
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      // Handle update available
      alert('UPDATE UPDATE_AVAILABLE')
    }
  }

  //Updates.useUpdateEvents(eventListener)

  return (
    <View className={'space-y-2'}>
      {List.map((item) => (
        <View className={'flex flex-row justify-between py-4'} key={item.title}>
          <View className={'flex-row space-x-2 items-center'}>
            <Svg SvgComponent={item.icon} size={20} />
            <View>
              <SecondaryText variant={'bodyLarge'}>{item.title}</SecondaryText>
            </View>
          </View>
          <RightIcon />
        </View>
      ))}
      <Button title="Fetch update" onPress={onFetchUpdateAsync} />
    </View>
  )
}
