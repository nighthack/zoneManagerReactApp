import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import KeyboardAwareImage from '../Components/KeyboardAwareImage';
import SpinnerHOC from '../Components/SpinnerHoc';

import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginContainerStyle'
const FullScreenSpinnerView = SpinnerHOC(View);
class LoginContainer extends Component {
  state = {
    phone: '',
    password: '',
    visible: false,
    snack: '',
    showOTP: false,
  };
  isAttempting = false
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate()
    if (this.isAttempting && !newProps.fetching) {
      const { navigate } = this.props.navigation;
      navigate('Home', { partial: newProps.responsePartial })
    }
  }
  onPress = () => {
    this.dismissKeyboard();
    const { phone, password } = this.state;
    if (phone.length > 0 && password.length > 0) {
      this.isAttempting = true
      this.props.attemptLogin(phone, password);
    } else {
      this.setState({
        visible: true,
        snack: 'Missing Credentials'
      });
    }
  };

  onPhoneChanged = text => {
    this.setState({
      phone: text
    });
  };
  onPasswordChanged = text => {
    this.setState({
      password: text
    });
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  onRegister = () => {
    this.setState({
      visible: true,
      snack: 'Register not implemented yet'
    });
  };

  onForgot = () => {
    const { phone } = this.state;
    const regex = /^[6-9]\d{9}$/; //eslint-disable-line
    if (!regex.test(phone)) {
      this.setState({
        visible: true,
        snack: 'Enter Valid Phone Number and Click Forgot Password'
      });
    } else {
      
    }
  };

  renderSnackBar = () => {
    return (
      <Snackbar
        visible={this.state.visible}
        onDismiss={() => this.setState({ visible: false })}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
          }
        }}
      >
        {this.state.snack}
      </Snackbar>
    );
  };

  renderInputView = () => {
    return (
      <View style={styles.inputView}>
        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={this.state.email}
          style={styles.input}
          onChangeText={this.onPhoneChanged}
          error={this.state.emailError}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={this.state.password}
          style={styles.input}
          onChangeText={this.onPasswordChanged}
        />

        <Button
          mode="contained"
          onPress={this.onPress}
          style={styles.btn}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </Button>
        <Button
          mode="flat"
          onPress={this.onForgot}
          style={styles.forgot}
        >
          <Text>Forgot Password</Text>
        </Button>
        <Text style={styles.account}>Dont have an account</Text>

        <Button mode="flat" onPress={this.onRegister}>
          <Text style={styles.regText}>Register</Text>
        </Button>
      </View>
    );
  };
  renderLogo = () => {
    return (
      <View style={styles.imgView}>
        <KeyboardAwareImage source={Images.sunil} rounded />
        <Text style={styles.appName}>ನಮ್ಮ MLA</Text>
      </View>
    );
  };
  render() {
    return (
      <FullScreenSpinnerView
        spinner={this.props.isLoading}
        style={styles.main}
      >
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
            <View style={styles.container}>
              {this.renderLogo()}
              {this.renderInputView()}
              {this.renderSnackBar()}
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </FullScreenSpinnerView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (phone, password) => dispatch(LoginActions.loginRequest(phone, password)),
    getOTPForNumber: (phone) => dispatch(LoginActions.loginRequest(phone))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
