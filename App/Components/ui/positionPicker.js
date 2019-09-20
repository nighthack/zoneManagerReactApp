import React, { Component } from 'react'
import { Platform, AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import { Item, Picker, Text } from 'native-base'
import styled from 'styled-components/native'
import { connect } from 'react-redux';
import LoginActions from '../../Redux/LoginRedux';

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

const StyledSelectBox = styled(Picker)``

const Error = styled.Text`
 
  font-size: 15;
  color: #f4224a;
  margin: 4px 8px;
`
function renderPickerOptions(data, feature) {
  const { OS } = Platform;
  let PickerOptions = data.map(( {id, name }, index) => <Picker.Item key={`selectbox_${feature}_${index}`} label={name} value={id} />);
  return PickerOptions;
}

class PositionPicker extends Component {

  componentDidMount() {
    this.props.getPositionsList();
  }

  render() {
    const {
      label,
      value,
      error,
      disabled,
      onChange,
      placeholder,
      positions,
    } = this.props;
    if (positions && positions.length) {
      return (
        <Wrapper>
          {label ? <Label>{label}</Label> : null}
          <FormFieldWrapper>
            <StyledSelectBox
              disabled={disabled}
              placeholder={placeholder}
              placeholderTextColor="#a5a5a5"
              selectedValue={value}
              onValueChange={text => onChange(text)}
            >
              <Picker.Item key={`selectbox_position_placeholder`} label={'ಆಯ್ಕೆ ಮಾಡಿ'} value={null} />
              {renderPickerOptions(positions, 'positions')}
            </StyledSelectBox>
          </FormFieldWrapper>

          {!!error && <Error>{error}</Error>}
        </Wrapper>
      )
    }
    return null;
  }
}


const mapStateToProps = (state) => {
  return {
    positions: state.login.positionsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPositionsList: () => dispatch(LoginActions.getPositionsList()),
  }
}



PositionPicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}
PositionPicker.defaultProps = {
  disabled: false,
  error: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionPicker)