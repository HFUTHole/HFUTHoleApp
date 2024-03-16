import { usePostList } from '@/swr/hole'
import { PostRefreshableList } from '@/pages/home/component/PostRefreshableList'

export function PostList() {
  const query = usePostList()

  return (
    <>
      <PostRefreshableList {...query} />
    </>
  )
}
