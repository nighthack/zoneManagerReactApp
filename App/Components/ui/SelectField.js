import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Item, Picker, Text } from 'native-base'
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

const StyledSelectBox = styled(Picker)`
 
  font-size: 13;
  color: ${props => (props.disabled === true ? '#a5a5a5' : '#000')};
`

const Error = styled.Text`
 
  font-size: 15;
  color: #f4224a;
  margin: 4px 8px;
`
function renderPickerOptions(data, feature) {
  const { OS } = Platform;
  let options = [];
  if (OS === 'ios') {
    options = data
  } else {
    options = data.unshift({ name: 'ಆಯ್ಕೆ ಮಾಡಿ', value: null })
  }
  return options.map(({ value, name }, index) => <Picker.Item key={`selectbox_${feature}_${index}`} label={name} value={value} />)
}

export default function SelectField({
  label,
  value,
  error,
  disabled,
  onChange,
  placeholder,
  options,
}) {
  return (
    <Wrapper>
      {label ? <Label>{label}</Label> : null }
      <FormFieldWrapper>
        <StyledSelectBox
          disabled={disabled}
          placeholder={placeholder}
          placeholderTextColor="#a5a5a5"
          selectedValue={value}
          onValueChange={text => onChange(text)}
        >
        {renderPickerOptions(options, label)}
        </StyledSelectBox>
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
