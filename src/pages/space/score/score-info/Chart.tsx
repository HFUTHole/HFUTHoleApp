import { StableWebView } from '@/components/StableWebView'
import { useMemo } from 'react'

interface Props {
  data: SingleScoreDetail[]
}

export function ScoreDetailChart({ data }: Props) {
  const html = useMemo(
    () => `
<html lang="zh-CN" style="height: 100%">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover">
</head>
<body style="height: 100%; margin: 0;">
  <div id="main" style="height: 100%;"></div>

  
  <script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.min.js"></script>
  <script type="text/javascript">
   var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  radar: {
    // shape: 'circle',
    indicator: [
        ${data.map((item) => `{name: '${item.name}', max: 100}`).join(',')}
    ]
  },
  tooltip: {
    trigger: 'axis'
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
          value: [${data.map((item) => item.mine).join(',')}],
          name: '我的',
          areaStyle: {},
        },
        {
          value: [${data.map((item) => item.avg).join(',')}],
          name: '平均'
        },
        {
          value: [${data.map((item) => item.head).join(',')}],
          name: '前10%'
        },
        {
          value: [${data.map((item) => item.max).join(',')}],
          name: '最高'
        },
      ]
    }
  ]
};

option && myChart.setOption(option);

  </script>
</body>
</html>
  `,
    [data]
  )

  return (
    <StableWebView
      source={{
        html,
      }}
    />
  )
}
