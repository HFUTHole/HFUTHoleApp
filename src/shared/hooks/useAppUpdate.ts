import { useState, useCallback, useEffect } from 'react'
import * as Updates from 'expo-updates'

export const useAppUpdate = ({ visible, setVisible }) => {
  const [updateStatus, setUpdateStatus] = useState('')
  const [error, setError] = useState('')
  const [update, setUpdate] = useState<Updates.UpdateCheckResult | undefined>()

  const checkUpdate = useCallback(async () => {
    try {
      setUpdateStatus('checking')
      const update = await Updates.checkForUpdateAsync()
      setUpdate(update)
      if (update.isAvailable) {
        setUpdateStatus('available')
      } else {
        setUpdateStatus('unavailable')
      }
    } catch (error) {
      setUpdateStatus('error')
      setError(error)
    }
  }, [])

  const handleUpdate = useCallback(async () => {
    try {
      setUpdateStatus('handling')
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
      setUpdateStatus('')
    } catch (error) {
      setUpdateStatus('error')
      setError(error)
    }
  }, [])

  const hideModal = useCallback(() => {
    setVisible(false)
    setUpdateStatus('')
    setError('')
    setUpdate(undefined)
  }, [setVisible])

  return {
    visible,
    updateStatus,
    error,
    update,
    checkUpdate,
    handleUpdate,
    hideModal,
  }
}
