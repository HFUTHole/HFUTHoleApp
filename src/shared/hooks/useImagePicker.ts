import * as ImagePicker from 'expo-image-picker'
import { AwaitAble } from '@/shared/types'
import { Toast } from '@/shared/utils/toast'
import { Limit } from '@/shared/config'
import { useImmer } from 'use-immer'

interface Options extends ImagePicker.ImagePickerOptions {
  onSuccess: (data: ImagePicker.ImagePickerResult) => AwaitAble<void>
  onError?: (data: ImagePicker.ImagePickerErrorResult) => AwaitAble<void>
}

export function useImagePicker({ onSuccess, onError, ...options }: Options) {
  const [imgs, setImgs] = useImmer<ImagePicker.ImagePickerAsset[]>([])

  const removeImage = (asset: ImagePicker.ImagePickerAsset) => {
    if (options.selectionLimit === imgs.length) {
      Toast.error({
        text1: `最多只能选择${options.selectionLimit}张图片哦`,
      })
      return
    }

    setImgs((draft) => {
      draft = draft.filter((item) => item.uri !== asset.uri)

      return draft
    })
  }

  const onImageSelect = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        selectionLimit: 4,
        quality: 0.8,
        ...options,
      })

      if (result.assets) {
        for (const asset of result.assets) {
          const MB = (asset.fileSize || 0) / (1024 * 1024)

          if (MB > Limit.img.imgMaxSize) {
            Toast.error({
              text1: `这个图片太大了，不能超过4MB哦`,
              text2: `这个图片有${MB.toFixed(2)}MB`,
            })
            return
          }
        }
      }

      if (!result.canceled) {
        setImgs((draft) => {
          draft.push(...(result.assets || []))
        })
        onSuccess(result)
      }
    } catch (err) {
      if (!onError) {
        Toast.error({
          text1: '图片选择失败了',
        })
        return
      }

      onError(err as ImagePicker.ImagePickerErrorResult)
    }
  }

  return {
    onImageSelect,
    removeImage,
    imgs,
  }
}
