import { SecondaryText } from '@/components/Text/SecondaryText'
import { useAppUpdate } from '@/shared/hooks/useAppUpdate'
import { Button, Dialog } from 'react-native-paper'
import { UpdateCheckResult } from 'expo-updates'
import { getQAQFont } from '@/shared/utils/utils'
import { useEffect } from 'react'

const AppUpdateScreen = ({ visible, setVisible }) => {
  const { updateStatus, error, update, checkUpdate, handleUpdate, hideModal } =
    useAppUpdate({ visible, setVisible })

  useEffect(() => {
    if (visible) {
      checkUpdate()
    }
  }, [checkUpdate, visible])

  return (
    visible && (
      <>
        <CheckUpdateDialog
          visible={updateStatus === 'checking'}
          onDismiss={hideModal}
        />
        <ConfirmUpdateDialog
          visible={updateStatus === 'available'}
          onDismiss={hideModal}
          onContinue={handleUpdate}
          update={update}
        />
        <HandleUpdateDialog visible={updateStatus === 'handling'} />
        <UpdateUnavailableDialog
          visible={updateStatus === 'unavailable'}
          onDismiss={hideModal}
        />
        <UpdateErrorDialog
          visible={updateStatus === 'error'}
          onDismiss={hideModal}
          error={error}
        />
      </>
    )
  )
}

const CheckUpdateDialog = (props: {
  visible: boolean
  onDismiss: (() => void) | undefined
}) => {
  return (
    <Dialog
      visible={props.visible}
      dismissable={true}
      onDismiss={props.onDismiss}
    >
      <Dialog.Title>检查更新中 {getQAQFont('happy')}</Dialog.Title>
      <Dialog.Actions>
        <Button onPress={props.onDismiss}>取消</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const ConfirmUpdateDialog = (props: {
  visible: boolean
  onDismiss: (() => void) | undefined
  onContinue: () => void
  update: UpdateCheckResult | undefined
}) => {
  return (
    <Dialog
      visible={props.visible}
      dismissable={true}
      onDismiss={props.onDismiss}
    >
      <Dialog.Title>有更新啦 {getQAQFont('happy')}</Dialog.Title>
      <Dialog.Content>
        <SecondaryText>
          更新内容:
          {'\n'}
          {props.update?.manifest?.extra['update-message']}
        </SecondaryText>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={props.onDismiss}>取消</Button>
        <Button onPress={props.onContinue}>更新</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const HandleUpdateDialog = (props: { visible: boolean }) => {
  return (
    <Dialog visible={props.visible} dismissable={false}>
      <Dialog.Title>更新中 {getQAQFont('happy')}</Dialog.Title>
    </Dialog>
  )
}

const UpdateErrorDialog = (props: {
  visible: boolean
  onDismiss: (() => void) | undefined
  error: string
}) => {
  return (
    <Dialog
      visible={props.visible}
      dismissable={true}
      onDismiss={props.onDismiss}
    >
      <Dialog.Title>更新失败了 {getQAQFont('sadness')}</Dialog.Title>
      <Dialog.Content>
        <SecondaryText>{props.error.toString()}</SecondaryText>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={props.onDismiss}>好吧</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const UpdateUnavailableDialog = (props: {
  visible: boolean
  onDismiss: (() => void) | undefined
}) => {
  return (
    <Dialog
      visible={props.visible}
      dismissable={true}
      onDismiss={props.onDismiss}
    >
      <Dialog.Title>已经是最新啦 {getQAQFont('happy')}</Dialog.Title>
      <Dialog.Actions>
        <Button onPress={props.onDismiss}>好耶</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default AppUpdateScreen
