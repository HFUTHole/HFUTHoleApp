import { getHelp } from '@/request/space/chore'
import { HelpType } from '@/pages/space/@utils/types'
import { useParams } from '@/shared/hooks/useParams'
import { useQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'

interface RouteParams {
  type: HelpType[]
}

const helpTitle: Record<HelpType, string> = {
  common: '公共',
  course: '课程表',
  login: '登录',
  score: '成绩',
  grammar: '成绩换算',
}

export const useHelp = () => {
  const params = useParams<RouteParams>()

  const key = [SWRKeys.space.chore.help, params.type]

  const query = useQuery(key, {
    queryFn: async () => {
      const res = await Promise.all(params.type.map((item) => getHelp(item)))
      return res.map((item, i) => ({
        title: helpTitle[params.type[i]],
        message: item,
      }))
    },
  })

  return query
}