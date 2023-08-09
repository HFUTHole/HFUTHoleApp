import { StableWebView } from '@/components/StableWebView'
import { useMemo } from 'react'
import { Echarts } from '@/components/echarts/Echarts'

interface Props {
  data: SingleScoreDetail[]
}

export function ScoreDetailChart({ data }: Props) {
  const options = useMemo(
    () => ({
      radar: {
        indicator: data.map((item) => ({ name: item.name, max: 100 })),
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {},
      series: [
        {
          name: '成绩分布',
          type: 'radar',
          tooltip: {
            trigger: 'item',
          },
          data: [
            {
              value: data.map((item) => item.mine),
              name: '我的',
              areaStyle: {},
            },
            {
              value: data.map((item) => item.avg),
              name: '平均',
            },
            {
              value: data.map((item) => item.head),
              name: '前10%',
            },
            {
              value: data.map((item) => item.max),
              name: '最高',
            },
          ],
        },
      ],
    }),
    [data]
  )

  return <Echarts options={options} />
}
