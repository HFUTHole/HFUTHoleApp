import { useParams } from '@/shared/hooks/useParams'
import { isNumber } from 'class-validator'
import Toast from 'react-native-toast-message'

export function useHoleDetailId() {
  const params = useParams<{ id: number }>()

  if (!isNumber(params.id)) {
    Toast.show({
      type: 'error',
      text1: `帖子id #${params.id}不是数字`,
    })

    return
  }

  return params.id
}
