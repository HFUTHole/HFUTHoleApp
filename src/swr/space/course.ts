import { SWRKeys } from '@/swr/utils'
import { useQuery } from 'react-query'
import { getCourseListRequest } from '@/request/space/course'
import { useAppDispatch } from '@/store/store'
import { changeCourseInfo } from '@/store/reducer/spaceCourse'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useEffect } from 'react'
import { useCurrentSemester } from '@/shared/context/space/semester'

// 依赖 currentSemesterId 与 isLogin
export const useSpaceCourse = () => {
  const dispatch = useAppDispatch()
  const { selectedSemesterId } = useCurrentSemester()
  const { isLogin } = useSpaceAuth()

  const params = { semesterId: selectedSemesterId }
  const key = [SWRKeys.space.course.all, params]

  const query = useQuery<ICourseResponse>(key, {
    enabled: isLogin && !!selectedSemesterId,
    queryFn: () => getCourseListRequest(params),
  })

  useEffect(() => {
    const { data } = query
    if (!data) {
      return
    }
    dispatch(changeCourseInfo(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query.data])

  // 退出重新登陆的情况
  useEffect(() => {
    isLogin && query.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return query
}
