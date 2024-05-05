import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { ZoomImage } from '@/components/image/ZoomImage'
import { ImageListItem } from '@/components/image/ImageListItem'

export const ImageList: React.FC<{
  imgs?: string[]
}> = ({ imgs }) => {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  const open = () => {
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
  }

  return (
    <View>
      {imgs?.length ? (
        <View>
          <Modal visible={visible} transparent={true} onRequestClose={close}>
            <ZoomImage
              imageUrls={imgs?.map((img) => ({ url: img }))}
              index={index}
              close={close}
            />
          </Modal>
          <View className={'flex flex-row flex-wrap px-2'}>
            {imgs?.map((img, index) => (
              <View className={'w-[33.3%] h-32'} key={index}>
                <ImageListItem
                  img={img}
                  i={index}
                  length={imgs?.length}
                  open={open}
                  setIndex={setIndex}
                />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}
