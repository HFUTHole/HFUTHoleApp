import ImageViewer from 'react-native-image-zoom-viewer'
import React from 'react'
import { Actionsheet } from 'native-base'
import { List } from 'react-native-paper'
import { saveToAlbum } from '@/shared/utils/utils'
import Toast from 'react-native-toast-message'
import { Func } from '@/shared/types'
import { StatusBar } from 'react-native'

export function ZoomImage({
  close,
  ...props
}: React.ComponentProps<typeof ImageViewer> & { close: Func }) {
  return (
    <>
      <StatusBar translucent={true} backgroundColor={'#000'} />
      <ImageViewer
        enableSwipeDown={true}
        enablePreload={true}
        onSave={saveToAlbum}
        onSwipeDown={close}
        onCancel={close}
        onClick={close}
        menuContext={{
          saveToLocal: '保存到相册',
          cancel: '取消',
        }}
        style={{
          flex: 1,
          width: '100%',
        }}
        renderHeader={() => <Toast />}
        menus={({ cancel, saveToLocal }) => {
          return (
            <>
              <Actionsheet isOpen={true} onClose={() => cancel()}>
                <Actionsheet.Content>
                  <List.Section title="操作" className={'w-full'}>
                    <List.Item title={'保存到相册'} onPress={saveToLocal} />
                    <List.Item title={'取消'} onPress={cancel} />
                  </List.Section>
                </Actionsheet.Content>
              </Actionsheet>
            </>
          )
        }}
        {...props}
      />
    </>
  )
}
