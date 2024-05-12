import { useParams } from '@/shared/hooks/useParams'

export function useTagParams() {
  const params = useParams<{ tag: string }>()

  return params
}
