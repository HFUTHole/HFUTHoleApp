import * as ImagePicker from 'expo-image-picker'
import { Toast } from '@/shared/utils/toast'
import { useImmer } from 'use-immer'
import { ImagePickerResult } from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

const compressImage = async (uri: string) => {
  let fileSizeInBytes = (await fetch(uri)).headers.get('Content-Length')
  let fileSizeInMB = fileSizeInBytes / (1024 * 1024)
  let compressQuality = 1.0

  // Adjust quality to reduce size to below 4MB
  while (fileSizeInMB > 4) {
    compressQuality -= 0.1
    const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
      compress: compressQuality,
      format: ImageManipulator.SaveFormat.JPEG,
    })
    fileSizeInBytes = (await fetch(manipResult.uri)).headers.get(
      'Content-Length',
    )
    fileSizeInMB = fileSizeInBytes / (1024 * 1024)
    uri = manipResult.uri
  }

  return { uri, fileSizeInMB }
}

export function useSelectImage(options: ImagePicker.ImagePickerOptions) {
  const [imgs, setImgs] = useImmer<ImagePickerResult['assets']>([])

  const onSelectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        selectionLimit: 3,
        quality: 0.9,
        ...options,
      })

      if (!result.canceled) {
        setImgs((draft) => {
          for (const assets of result.assets!) {
            if (draft!.length >= options.selectionLimit!) {
              Toast.error({
                text1: `最多只能选${options.selectionLimit}张图片哦`,
              })
              return
            }
            draft!.push(assets)
          }
        })
      }
    } catch (err) {
      Toast.error({ text1: '图片选择失败' })
    }
  }

  return {
    imgs,
    setImgs,
    onSelectImage,
  }
}
