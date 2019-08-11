import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const Wrapper = styled.Text`
  
  font-size: 13;
  color: #8a8a8f;
  text-transform: uppercase;
  padding: 16px 16px 0px;
`

export default function SectionHeader({ children }) {
  return <Wrapper>{children}</Wrapper>
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired
}
