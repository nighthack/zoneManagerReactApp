import React from 'react'
import PropTypes from 'prop-types'
import { Item, Input, Text } from 'native-base'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  margin: 8px 0px;
`

const FormFieldWrapper = styled(Item).attrs({
  rounded: true
})`
  border-color: #fff;
  background-color: #fff;
  padding: 0px 8px;
  margin: 0px;
`
const Label = styled(Text)`
  font-size: 12;
  color: #278D27;
  margin: 4px;
`;

const TextBox = styled(Input)`
 
  font-size: 13;
  color: ${props => (props.disabled === true ? '#a5a5a5' : '#000')};
`

const Error = styled.Text`
 
  font-size: 15;
  color: #f4224a;
  margin: 4px 8px;
`

export default function SelectField({
  label,
  value,
  error,
  secure,
  disabled,
  keyboardType,
  returnKeyType,
  onChangeText,
  onSubmitEditing
}) {
  return (
    <Wrapper>
      {label ? <Label>{label}</Label> : null }
      <FormFieldWrapper>
        <TextBox
          disabled={disabled}
          placeholder={label}
          placeholderTextColor="#a5a5a5"
          value={value}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onChangeText={text => onChangeText(text)}
          onSubmitEditing={() => onSubmitEditing()}
        />
      </FormFieldWrapper>

      {!!error && <Error>{error}</Error>}
    </Wrapper>
  )
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  secure: PropTypes.bool,
  disabled: PropTypes.bool,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func
}
SelectField.defaultProps = {
  secure: false,
  disabled: false,
  keyboardType: 'default',
  returnKeyType: 'next',
  error: '',
  onSubmitEditing: () => null
}
