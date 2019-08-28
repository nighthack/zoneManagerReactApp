import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import { RegularButton, CustomActivityIndicator } from '../ui'

const Wrapper = styled.View`
  padding: 16px;
`

export const ActionText = styled.Text`
 
  font-size: 15;
  text-align: center;
  color: #8a8a8f;
  margin-top: 16;
`

export default function FormContainer({
  actionText,
  submitButtonText,
  onSubmitButtonPress,
  loading,
  children
}) {
  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <Wrapper>
        {children}

        <RegularButton
          text={submitButtonText}
          onPress={() => onSubmitButtonPress()}
        />

        {actionText && <ActionText>{actionText}</ActionText>}

        {loading && <CustomActivityIndicator />}
      </Wrapper>
    </KeyboardAwareScrollView>
  )
}

FormContainer.propTypes = {
  actionText: PropTypes.string,
  submitButtonText: PropTypes.string.isRequired,
  onSubmitButtonPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired
}
