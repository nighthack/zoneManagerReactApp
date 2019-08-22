import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item, Text } from 'native-base'
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'
import TimePicker from "react-native-24h-timepicker";

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

const StyledTextBox = styled(TouchableOpacity)`
padding: 10px 0px;
`

const Error = styled.Text`
 
  font-size: 15;
  color: #f4224a;
  margin: 4px 8px;
`
class TimePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.props.onChange(`${hour}:${minute}`);
    this.TimePicker.close();
  }

  render() {
    const {
      label,
      value,
      error,
      disabled,
      onChange,
      placeholder,
    } = this.props;
    const { time } = this.state;
    return (
      <Wrapper>
        {label ? <Label>{label}</Label> : null}
        <FormFieldWrapper>
          <StyledTextBox></StyledTextBox>
          <TouchableOpacity
            onPress={() => this.TimePicker.open()}
          >
            {
              time ?
              <Text style={{paddingVertical: 8, paddingHorizontal: 4}}>{time}</Text> :
              <Text style={{paddingVertical: 8, paddingHorizontal: 4, color: '#a5a5a5'}}>{placeholder}</Text>
            }
            
          </TouchableOpacity>
          <TimePicker
            ref={ref => {
              this.TimePicker = ref;
            }}
            onCancel={() => this.onCancel()}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
          />
        </FormFieldWrapper>

        {!!error && <Error>{error}</Error>}
      </Wrapper>
    )
  }
}


TimePickerComponent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}
TimePickerComponent.defaultProps = {
  disabled: false,
  error: '',
}

export default TimePickerComponent;