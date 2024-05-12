import { useRoute } from '@react-navigation/native'

export function useParams<T extends object>() {
  return (useRoute().params as T) || {}
}
