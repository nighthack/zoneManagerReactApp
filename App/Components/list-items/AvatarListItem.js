import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ImageProgressComponent } from '../ui'

const Wrapper = styled.TouchableOpacity`
  width: 80;
  align-items: center;
  margin-left: 16;
`

const TitleText = styled.Text.attrs({
  numberOfLines: 1
})`
 
  font-size: 15;
  margin-top: 8;
`

const CategoryText = styled.Text`
 
  font-size: 13;
  color: #8a8a8f;
  margin-top: 4;
`

export default function AvatarListItem({ title, category, photoURL, onPress }) {
  return (
    <Wrapper onPress={() => onPress()}>
      <ImageProgressComponent
        photoURL={photoURL}
        resizeMode="cover"
        style={{ width: 80, height: 80 }}
        imageStyle={{ borderRadius: 40 }}
      />

      <TitleText>{title}</TitleText>
      <CategoryText>{category}</CategoryText>
    </Wrapper>
  )
}

AvatarListItem.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
