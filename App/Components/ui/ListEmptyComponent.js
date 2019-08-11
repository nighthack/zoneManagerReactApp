import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const HelpText = styled.Text`
  width: 250;
  font-size: 15;
  text-align: center;
`

const RefreshButton = styled.Text`
  width: 100;
 
  font-size: 15;
  color: #fff;
  text-align: center;
  margin-top: 8;
  padding: 4px 8px;
  background-color: #32ce89;
`

export default function ListEmptyComponent({
  text,
  showRefreshButton,
  onRefreshButtonPress
}) {
  return (
    <Wrapper>
      <HelpText>{text}</HelpText>
      {showRefreshButton && (
        <RefreshButton onPress={() => onRefreshButtonPress()}>
          REFRESH
        </RefreshButton>
      )}
    </Wrapper>
  )
}

ListEmptyComponent.propTypes = {
  text: PropTypes.string.isRequired,
  showRefreshButton: PropTypes.bool,
  onRefreshButtonPress: PropTypes.func
}
ListEmptyComponent.defaultProps = {
  showRefreshButton: false,
  onRefreshButtonPress: () => null
}
