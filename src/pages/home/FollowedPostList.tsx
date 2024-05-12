import { useHomeFollowListSwr } from '@/swr/home/follow'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

export const FollowedPostList = () => {
  const query = useHomeFollowListSwr()

  return <RefreshableHoleList {...query} />
}
