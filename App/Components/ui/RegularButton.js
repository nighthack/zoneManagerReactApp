import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base'
import styled from 'styled-components/native'

const Wrapper = styled(Button).attrs({
  full: true,
  rounded: true
})`
  height: 50;
  justify-content: center;
  align-items: center;
  margin: 25px 0px 10px;
  background-color: #F97D09;
`

const ButtonText = styled.Text.attrs({
  numberOfLines: 1
})`
  
  font-size: 15;
  color: #fff;
`

export default function RegularButton({ text, onPress }) {
  return (
    <Wrapper onPress={() => onPress()}>
      <ButtonText>{text}</ButtonText>
    </Wrapper>
  )
}

RegularButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
