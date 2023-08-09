import { useMemo } from 'react'
import { useSpaceCourseFailureQuery } from '@/swr/space/course/failure'
import { formatSemester } from '@/pages/space/@utils/utils'
import { Echarts } from '@/components/echarts/Echarts'

export function CourseFailureRateQueryChart() {
  const { data } = useSpaceCourseFailureQuery()

  const options = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        data: data?.map((item) => formatSemester(item.semesterName)).reverse(),
      },
      legend: {
        top: 'top', // 设置图例组件的位置在图表上方
        textStyle: {
          color: 'black', // 设置图例文本的颜色
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data?.map((item) => (item.failRate * 100).toFixed(2)).reverse(),
          type: 'line',
          smooth: true,
          name: '挂科率',
        },
      ],
    }),
    [data]
  )

  return <Echarts options={options} />
}
