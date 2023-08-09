import { useCallback, useRef, useEffect } from 'react'
import { getJavascriptSource, toString } from './utils'
import { WebView } from 'react-native-webview'

const html = `
<html lang="zh-CN" style="height: 100%">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover">
  <script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.min.js"></script>
</head>
<body style="height: 100%; margin: 0">
  <div id="container" style="height: 100%; width: 100%;"></div>
</body>
</html>  
`

interface EchartsProps {
  options: object
}

export interface EchartsInstance {
  updateOptions: (options: object) => void
}

export const Echarts = ({ options }: EchartsProps) => {
  const webviewRef = useRef<WebView | null>(null)

  const onLoadEnd = useCallback(() => {
    webviewRef.current?.injectJavaScript(getJavascriptSource(toString(options)))
  }, [options])

  const updateOptions = useCallback((value: object) => {
    webviewRef.current?.postMessage(toString(value))
  }, [])

  useEffect(() => {
    updateOptions(options)
  }, [options, updateOptions])

  return (
    <WebView
      ref={webviewRef}
      source={{
        html,
        baseUrl: '',
      }}
      onLoadEnd={onLoadEnd}
      originWhitelist={['*']}
      scrollEnabled={false}
      allowFileAccess
      allowUniversalAccessFromFileURLs
      mixedContentMode="always"
      style={{ opacity: 0.99 }}
    />
  )
}
