import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const Wrapper = styled.View`
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

export default function CoursePriceTag({ price }) {
  return (
    <Wrapper>
      <Price>{price}</Price>
    </Wrapper>
  )
}

CoursePriceTag.propTypes = {
  price: PropTypes.string.isRequired
}
