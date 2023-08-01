import { useParams } from '@/shared/hooks/useParams'
import { isNumber } from 'class-validator'
import Toast from 'react-native-toast-message'

export function useHoleDetailId() {
  const params = useParams<{ id: number }>()

  return params.id
}
