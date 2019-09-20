import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { IconWrapper, Icon, Title } from '../grid-items/CourseCategoryGridItem'

const Wrapper = styled.View`
  width: 80;
  align-items: center;
  margin-left: 16;
`

export default function RecommendedListItem({ icon, title, onPress }) {
  return (
    <Wrapper>
      <IconWrapper onPress={() => onPress()}>
        <Icon name={icon} />
      </IconWrapper>
      <Title>{title}</Title>
    </Wrapper>
  )
}

RecommendedListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
