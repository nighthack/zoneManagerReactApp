import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'


const Wrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  background-color: #f36523;
  border-radius: 16;
`

const ViewWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  background-color: #f36523;
  border-radius: 16;
`

const Price = styled.Text`
  font-size: 15;
  color: #fff;
  text-align: center;
`

export default function CoursePriceTag({ price, showCloseButton, onClick }) {
  if (showCloseButton) {
    return (
      <Wrapper onPress={onClick}>
        <Price>{price} {showCloseButton ? 'x' : ''}</Price>
      </Wrapper>
    )
  }
  return (
    <ViewWrapper>
      <Price>{price}</Price>
    </ViewWrapper>
  )
}

CoursePriceTag.propTypes = {
  price: PropTypes.string.isRequired
}
