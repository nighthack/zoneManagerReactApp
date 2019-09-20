import React from 'react'
import PropTypes from 'prop-types'
import Image from 'react-native-image-progress'
import { Circle } from 'react-native-progress'
import styled from 'styled-components/native'

const ImageProgressWrapper = styled(Image).attrs({
  indicator: Circle,
  indicatorProps: {
    size: 30,
    thickness: 2,
    color: '#000',
    indeterminate: false
  }
})``

export default function ImageProgressComponent({
  photoURL,
  imageStyle,
  style,
  resizeMode
}) {
  return (
    <ImageProgressWrapper
      style={style}
      source={{ uri: photoURL }}
      imageStyle={imageStyle}
      resizeMode={resizeMode}
    />
  )
}

ImageProgressComponent.propTypes = {
  photoURL: PropTypes.string.isRequired,
  imageStyle: PropTypes.object,
  style: PropTypes.object.isRequired,
  resizeMode: PropTypes.string
}
ImageProgressComponent.defaultProps = {
  resizeMode: 'contain'
}
