import { useQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { GetUserProfileRequest } from '@/request/apis/user'
import { useMemo } from 'react'
import { Apis } from '@/request/apis'
import { useBaseQuery } from '@/swr/useBaseQuery'

export function useUserProfile() {
  const query = useBaseQuery({
    queryKey: [SWRKeys.user.profile],
    queryFn: () => GetUserProfileRequest(),
  })

  const levelPercent = useMemo(() => {
    return (
      ((query.data?.level.experience || 0) * 100) /
      (query.data?.level.nextLevelRequiredExperience || 1)
    )
  }, [query.data?.level])

  return {
    ...query,
    levelPercent,
  }
}

export function useOtherUserData(userId: number) {
  const query = useQuery([SWRKeys.user.otherProfile, userId], () =>
    Apis.user.getAnotherUserProfileRequest({
      userId,
    }),
  )

  const levelPercent = useMemo(() => {
    return (
      ((query.data?.level.experience || 0) * 100) /
      (query.data?.level.nextLevelRequiredExperience || 1)
    )
  }, [query.data?.level])

  return {
    ...query,
    levelPercent,
  }
}
