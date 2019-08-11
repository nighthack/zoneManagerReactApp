import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const Title = styled.Text`
 
  font-size: 15;
  color: ${props => (props.active ? '#32ce89' : '#8a8a8f')};
`

export default function TabHeader({ title, active }) {
  return (
    <Title active={active} numberOfLines={1}>
      {title}
    </Title>
  )
}

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
}
