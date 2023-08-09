import { useAppSelector } from '@/store/store'
import { useEffect, useMemo, useRef } from 'react'
import { formatSemester } from '@/pages/space/@utils/utils'
import { StableWebView } from '@/components/StableWebView'
import { Echarts, type EchartsInstance } from '@/components/echarts/Echarts'
import { floatFixed } from '@/shared/utils/utils'
import { RankType, ScoreType } from '@/store/reducer/spaceScore'

const seriesMap: { key: keyof RankInfo; name: string }[] = [
  { key: 'mine', name: '我的' },
  { key: 'avg', name: '平均' },
  { key: 'head', name: '前10%' },
  { key: 'max', name: '最高' },
]

const getRankInfo = (
  semester: Semester,
  rankType: RankType,
  scoreType: ScoreType
) => {
  const rankData =
    rankType === 'compulsoryRank' ? semester.compulsoryRank : semester.totalRank
  return scoreType === 'score' ? rankData.score : rankData.gpa
}

export const SemesterScoreChart = () => {
  const { semesters, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const options = useMemo(() => {
    const getSeriesData = (key: keyof RankInfo) =>
      semesters
        .map((semester) => {
          const scoreData = getRankInfo(semester, rankType, scoreType)
          return floatFixed(scoreData[key], 3)
        })
        .reverse()
    return {
      xAxis: {
        type: 'category',
        data: semesters.map((item) => formatSemester(item.semester)).reverse(),
      },
      yAxis: {
        type: 'value',
        min: Math.min(
          ...semesters.map((item) => {
            const { mine, max, head, avg } = getRankInfo(
              item,
              rankType,
              scoreType
            )
            return floatFixed(Math.min(mine, max, head, avg), 3)
          })
        ),
        max: Math.max(
          ...semesters.map((item) => {
            const { mine, max, head, avg } = getRankInfo(
              item,
              rankType,
              scoreType
            )
            return floatFixed(Math.max(mine, max, head, avg), 3)
          })
        ),
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
      series: seriesMap.map((item) => {
        const extra =
          item.key === 'mine'
            ? {
                areaStyle: {
                  opacity: 0.3,
                },
              }
            : {}
        return {
          name: item.name,
          data: getSeriesData(item.key),
          type: 'line',
          ...extra,
        }
      }),
    }
  }, [rankType, scoreType, semesters])

  return <Echarts options={options} />
}
