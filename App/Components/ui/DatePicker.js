import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Item, DatePicker, Text } from 'native-base'
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


const Error = styled.Text`
 
  font-size: 15;
  color: #f4224a;
  margin: 4px 8px;
`

export default function DatePickerFormField({
  label,
  value,
  error,
  disabled,
  onChange,
  placeholder,
  defaultDate,
}) {

  return (
    <Wrapper>
      {label ? <Label>{label}</Label> : null}
      <FormFieldWrapper>
        <DatePicker
          defaultDate={defaultDate}
          locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"spinner"}
          placeHolderText={placeholder}
          textStyle={{}}
          placeHolderTextStyle={{ color: 'rgba(36,42,56,0.4)' }}
          onDateChange={(date) => onChange(date)}
          disabled={disabled}
        />
      </FormFieldWrapper>
      { !!error && <Error>{error}</Error> }
    </Wrapper >
  )
}

DatePickerFormField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  secure: PropTypes.bool,
  disabled: PropTypes.bool,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func
}
DatePickerFormField.defaultProps = {
  disabled: false,
  error: '',
  onSubmitEditing: () => null
}
