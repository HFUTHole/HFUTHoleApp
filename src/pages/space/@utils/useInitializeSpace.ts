import { useSpaceUserInfo } from '@/swr/space/user'
import { useSemesters } from '@/swr/space/chore'
import { useCurrentSemester } from '@/shared/context/space/semester'
import { useMount } from 'ahooks'

/**
 * @description 进入space做的一些初始化操作，比如发一些请求
 */
export const useInitializeSpace = () => {
  const { initializeSemesterId } = useCurrentSemester()

  const { data } = useSemesters()

  useSpaceUserInfo()

  // 解决重新登陆时，CurrentSemesterContextProvider 被卸载的问题
  useMount(() => {
    if (!data) {
      return
    }
    initializeSemesterId(data[0].id)
  })
}
