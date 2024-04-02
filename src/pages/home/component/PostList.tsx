import { usePostList } from '@/swr/hole'
import { PostRefreshableList } from '@/pages/home/component/PostRefreshableList'
import { TopCategories } from '@/pages/hole/latest/TopCategories'

export function PostList() {
  const query = usePostList()

  return (
    <>
      <PostRefreshableList ListHeaderComponent={TopCategories} {...query} />
    </>
  )
}
