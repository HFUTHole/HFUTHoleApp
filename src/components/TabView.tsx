import { useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  TabView as NativeTabView,
  SceneMap,
  type Route,
  type TabViewProps as NativeTabViewProps,
} from 'react-native-tab-view'

// 这里 component 写成 ReactNode 会报错，好奇怪
export type Tab = Route & { component?: any }

interface TabViewProps extends Partial<NativeTabViewProps<Route>> {
  tabs: Tab[]
}

export const TabView = ({ tabs, ...props }: TabViewProps) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)

  const renderScene = useMemo(
    () =>
      SceneMap(Object.fromEntries(tabs.map((tab) => [tab.key, tab.component]))),
    [tabs]
  )

  return (
    <NativeTabView
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      {...props}
    />
  )
}
