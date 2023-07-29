import {
  ApexCharts,
  type ApexAxisChartSeries,
  type ApexChartsInstance,
} from '@/components/apexcharts'
import { useAppSelector } from '@/store/store'
import { floatFixed } from '@/shared/utils/utils'
import { useEffect, useMemo, useRef } from 'react'
import { formatSemester } from '@/pages/space/@utils/utils'
import { useTheme } from 'react-native-paper'

const injectedCSS = `
div.apexcharts-toolbar {
  display: none;
}
`

const getOptions = (series: ApexAxisChartSeries[], categories: string[]) => `
{
  chart: {
    type: 'line',
  },
  series: ${JSON.stringify(series)},
  xaxis: {
    categories: ${JSON.stringify(categories)},
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      with: 12,
      height: 8,
    },
  },
  stroke: {
    width: 3,
  },
}
`

const seriesMap: { key: keyof RankInfo; name: string }[] = [
  { key: 'mine', name: '我的' },
  { key: 'avg', name: '平均' },
  { key: 'head', name: '前10%' },
  { key: 'max', name: '最高' },
]

const useChart = () => {
  const { semesters, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const series = useMemo<ApexAxisChartSeries[]>(() => {
    const getSeriesData = (key: keyof RankInfo) =>
      semesters
        .map((semester) => {
          const rankData =
            rankType === 'compulsory'
              ? semester.compulsoryRank
              : semester.totalRank
          const scoreData =
            scoreType === 'score' ? rankData.score : rankData.gpa
          return floatFixed(scoreData[key])
        })
        .reverse()

    return seriesMap.map((item) => ({
      name: item.name,
      data: getSeriesData(item.key),
    }))
  }, [rankType, scoreType, semesters])

  const categories = useMemo(
    () => semesters.map((item) => formatSemester(item.semester)).reverse(),
    [semesters]
  )

  return {
    series,
    categories,
  }
}

export const SemesterScoreChart = () => {
  const chartRef = useRef<ApexChartsInstance>()
  const { categories, series } = useChart()
  const theme = useTheme()

  useEffect(() => {
    chartRef.current?.updateSeries(series)
  }, [series])
  useEffect(() => {
    chartRef.current?.updateOptions(
      {
        xaxis: {
          categories,
        },
      },
      true
    )
  }, [categories])

  return (
    <ApexCharts
      ref={chartRef}
      options={getOptions(series, categories)}
      injectedCSS={injectedCSS}
      backgroundColor={theme.colors.background}
    />
  )
}
