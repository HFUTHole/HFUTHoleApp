import { useHomeFollowListSwr } from '@/swr/home/follow'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { PostRefreshableList } from '@/pages/home/component/PostRefreshableList'

export const FollowedPostList = () => {
  const query = useHomeFollowListSwr()

  return <PostRefreshableList {...query} />
}
