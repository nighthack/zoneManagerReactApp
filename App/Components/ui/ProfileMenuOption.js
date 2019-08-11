import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'native-base'
// import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import Separator from './Separator'

const Wrapper = styled.TouchableOpacity`
  height: 60;
  flex-direction: row;
  padding: 0px 16px;
`

const IconWrapper = styled(Card)`
  width: 30;
  height: 30;
  justify-content: center;
  align-items: center;
  align-self: center;
`

const Right = styled.View`
  flex: 1;
  margin: 0px 8px;
`

const LabelWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const Label = styled.Text.attrs({
  numberOfLines: 1
})`
  flex: 1;
 
  font-size: 15;
`

export default function ProfileMenuOption({
  iconName,
  iconColor,
  text,
  showDivider,
  onPress
}) {
  return (
    <Wrapper onPress={() => onPress()}>
      <IconWrapper>
      </IconWrapper>

      <Right>
        <LabelWrapper>
          <Label>{text}</Label>
          <Ionicons name="ios-arrow-forward" color="#8a8a8f" size={20} />
        </LabelWrapper>
        {showDivider && <Separator />}
      </Right>
    </Wrapper>
  )
}

ProfileMenuOption.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  showDivider: PropTypes.bool,
  onPress: PropTypes.func.isRequired
}
ProfileMenuOption.defaultProps = {
  showDivider: false
}
