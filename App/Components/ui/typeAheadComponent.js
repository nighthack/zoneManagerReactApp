import React, { Component } from 'react';
import PropTypes from 'prop-types'; // 15.6.0
import {
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProgressiveInput extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    value: PropTypes.string,
    isLoading: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    clearButtonIcon: PropTypes.string,
    clearButtonColor: PropTypes.string,
    clearButtonSize: PropTypes.number,
    clearButtonStyle: PropTypes.object,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onInputCleared: PropTypes.func,
    underlineColorAndroid: PropTypes.string,
  };

  static defaultProps = {
    editable: true,
    clearButtonIcon: 'ios-close-circle',
    clearButtonColor: 'lightgrey',
    clearButtonSize: 20,
    underlineColorAndroid: 'transparent',
  };

  constructor(props) {
    super(props);

    this.state = {
      showClearButton: false,
    };
  }
  clearInput() {
    this.setState({ focus: false });
    this.props.onInputCleared();
  }

  isFocused() {
    return this.input.isFocused();
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          ref={input => (this.input = input)}
          style={[styles.textInput, this.props.textInputStyle]}
          focus={this.state.focus}
          value={this.props.value}
          editable={this.props.editable}
          onFocus={this._onFocus}
          placeholder={this.props.placeholder}
          onChangeText={this._onChangeText}
          selectTextOnFocus={this.props.selectTextOnFocus}
          onBlur={this._onBlur}
          autoCorrect={this.props.autoCorrect}
          keyboardType={this.props.keyboardType}
          multiline={this.props.multiline}
          placeholderTextColor={this.props.placeholderTextColor}
          returnKeyType={this.props.returnKeyType}
          autoCapitalize={this.props.autoCapitalize}
          maxLength={this.props.maxLength}
          onEndEditing={this.props.onEndEditing}
          onChange={this.props.onChange}
          underlineColorAndroid={this.props.underlineColorAndroid}
        />
        {this._renderActivityIndicator()}
      </View>
    );
  }

  _renderActivityIndicator = () => {
    if(this.props.isLoading) {
      return (
        <ActivityIndicator
          animating={this.props.isLoading}
          style={[
            styles.activityIndicator,
            this.props.activityIndicatorStyle,
          ]}
        />
      );
    }
    return null;

  };

  _renderClearButton = () => {
    if (this.state.showClearButton) {
      return (
        <TouchableOpacity onPress={() => this.clearInput()}>
          <Ionicons
            name={this.props.clearButtonIcon}
            size={this.props.clearButtonSize}
            style={[styles.clearIcon, this.props.clearButtonStyle]}
            color={this.props.clearButtonColor}
          />
        </TouchableOpacity>
      );
    }
  };

  _onFocus = () => {
    this._shouldShowClearButton();
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  _onChangeText = text => {
    this._shouldShowClearButton(text);
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  };

  _shouldShowClearButton = value => {
    const v = value || this.props.value;
    const showClearButton = v ? true : false;
    this.setState({ showClearButton });
  };

  _onBlur = () => this.setState({ showClearButton: false });
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  clearIcon: {
    marginLeft: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  activityIndicator: {
    marginLeft: 5,
    marginRight: 5,
  },
});

export default ProgressiveInput;