import { useBaseQuery } from '@/swr/useBaseQuery'
import { SWRKeys } from '@/swr/utils'
import { Apis } from '@/request/apis'

export function useHomeCategoriesSWR() {
  const query = useBaseQuery({
    queryKey: [SWRKeys.home.followList],
    queryFn: Apis.hole.GetHoleCategoryList,
  })

  return {
    ...query,
  }
}
