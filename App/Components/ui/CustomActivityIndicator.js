import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { LoadingIndicator } from './ListLoadingComponent'

const Wrapper = styled.View`
  width: 150;
  height: 150;
  justify-content: center;
  align-self: center;
  border-radius: 8;
  background-color: #070a0c;
`

const Label = styled.Text`
 
  font-size: 15;
  color: #fff;
  text-align: center;
  margin-top: 16;
`

const IndicatorWrapper = styled.View`
  align-self: center;
`

export default function CustomActivityIndicator({ text }) {
  return (
    <Modal isVisible>
      <Wrapper>
        <IndicatorWrapper>
          <LoadingIndicator color="#fff" />
        </IndicatorWrapper>

        <Label>{text}</Label>
      </Wrapper>
    </Modal>
  )
}

CustomActivityIndicator.propTypes = {
  text: PropTypes.string
}
CustomActivityIndicator.defaultProps = {
  text: 'Please wait'
}
