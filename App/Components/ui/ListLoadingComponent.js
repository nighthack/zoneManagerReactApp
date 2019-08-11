import React from 'react'
import PropTypes from 'prop-types'
import { CircleSnail } from 'react-native-progress'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LoadingText = styled.Text`
  font-size: 15;
  margin-top: 16;
  text-align: center;
`

export const LoadingIndicator = styled(CircleSnail).attrs({
  color: '#323547',
  size: 25
})``

export default function ListLoadingComponent({ text }) {
  return (
    <Wrapper>
      <LoadingIndicator />
      <LoadingText>{text}</LoadingText>
    </Wrapper>
  )
}

ListLoadingComponent.propTypes = {
  text: PropTypes.string.isRequired
}
