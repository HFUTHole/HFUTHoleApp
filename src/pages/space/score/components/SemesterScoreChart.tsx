import { useAppSelector } from '@/store/store'
import { useEffect, useMemo, useRef } from 'react'
import { formatSemester } from '@/pages/space/@utils/utils'
import { StableWebView } from '@/components/StableWebView'

export const SemesterScoreChart = () => {
  const { semesters } = useAppSelector((state) => state.spaceScore)

  const html = useMemo(
    () => `
<html lang="zh-CN" style="height: 100%">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover">
</head>
<body style="height: 100%; margin: 0">
  <div id="container" style="height: 100%; width: 100%;"></div>

  
  <script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.min.js"></script>
  <script type="text/javascript">
    var dom = document.getElementById('container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    
    var option;

    option = {
  xAxis: {
    type: 'category',
    data: [${semesters
      .map((item) => `'${formatSemester(item.semester)}'`)
      .reverse()
      .toString()}]
  },
  legend: {
      top: 'top', // 设置图例组件的位置在图表上方
      textStyle: {
        color: 'black' // 设置图例文本的颜色
      }
    },
  tooltip: {
    trigger: 'axis'
  },
  yAxis: {
    type: 'value',
    min: Math.min(${semesters
      .map((item) => {
        const { mine, max, head, avg } = item.compulsoryRank.score

        return Math.min(mine, max, head, avg).toFixed(3)
      })
      .reverse()
      .join(',')}, 100),
    max: Math.max(${semesters
      .map((item) => item.compulsoryRank.score.max.toFixed(3))
      .reverse()
      .join(',')}, 0)
  },
  
  series: [
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.mine.toFixed(3))
        .reverse()
        .toString()}],
      type: 'line',
      name: '我的',
      areaStyle: {
        opacity: 0.3
      },
    },
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.avg.toFixed(3))
        .reverse()
        .toString()}],
      type: 'line',
      name: '平均',
    },
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.head.toFixed(3))
        .reverse()
        .toString()}],
      type: 'line',
      name: '前10%',
    },
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.max.toFixed(3))
        .reverse()
        .toString()}],
      type: 'line',
      name: '最高',
    },
  ]
};

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
  </script>
</body>
</html>
  `,
    [semesters]
  )

  return (
    <StableWebView
      source={{
        html,
      }}
    />
  )
}
