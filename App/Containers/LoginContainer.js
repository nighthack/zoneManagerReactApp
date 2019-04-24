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
  isAttempting = false;
  isOTPFetched = false;
  isOTPverified = false;
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  componentWillReceiveProps(newProps) {
    if (!this.OTPFetched && !newProps.fetching) {
      this.OTPFetched = true,
      this.setState({
        visible: true,
        snack: newProps.otpMessage
      });
    }
    if(newProps.verifyOTPapiStatus === 1 && !newProps.fetching) {
        const { navigate } = this.props.navigation;
        navigate('SignUpVerified')
    }
    if(newProps.verifyOTPapiStatus === 2 && !newProps.fetching && !this.isOTPverified) {
      this.setState({
        visible: true,
        snack: newProps.verifyOTPResponse ? newProps.verifyOTPResponse.message : 'Oops',
      });
      this.isOTPverified = true;
    }
    // this.forceUpdate()
    // if (this.isAttempting && !newProps.fetching) {
    //   const { navigate } = this.props.navigation;
    //   navigate('Home')
    // }
  }
  onPress = () => {
    this.dismissKeyboard();
    const regex = /^[6-9]\d{9}$/; //eslint-disable-line
    const { phone, password } = this.state;
    if (regex.test(phone) && password.length > 0) {
      this.isAttempting = true
      this.props.attemptLogin(phone, password);
    } else {
      let errorMsg = '';
      if(!regex.test(phone)) {
        errorMsg += 'Enter a valid Indian Phone Number' 
      }
      this.setState({
        visible: true,
        snack: `Missing Credentials ${errorMsg}`
      });
    }
  };

  verifyOTP = () => {
    this.dismissKeyboard();
    const { phone, otp } = this.state;
    const regex = /^[6-9]\d{9}$/; //eslint-disable-line
    if (regex.test(phone) && otp && otp.length === 4) {
      this.isAttempting = true;
      this.isOTPverified = false;
      this.props.verifyOtpAction(phone, otp);
    } else {
      this.setState({
        visible: true,
        snack: 'Missing OTP or Phone Number'
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

  onOTPchange = text => {
    this.setState({
      otp: text
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
      this.setState({
        showOTP: true,
      });
      this.OTPFetched = false,
      this.props.getOTPForNumber(phone)
    }
  };

  onSignIn = () => {
    this.setState({
      showOTP: false,
    });
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
    const { fetching, otpMessage } = this.props;
    const { showOTP } = this.state;
    return (
      <View style={styles.inputView}>
        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={this.state.phone}
          style={styles.input}
          onChangeText={this.onPhoneChanged}
          error={this.state.emailError}
          disabled={fetching}
        />
        {
          !showOTP ?
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={this.state.password}
              style={styles.input}
              onChangeText={this.onPasswordChanged}
              disabled={fetching}
            /> :
            <TextInput
              label="OTP"
              mode="outlined"
              keyboardType="phone-pad"
              value={this.state.otp}
              style={styles.input}
              onChangeText={this.onOTPchange}
              disabled={fetching}
            />
        }

        {
          showOTP ?
            <Button
              mode="contained"
              onPress={this.verifyOTP}
              style={styles.btn}
              loading={fetching}
              disabled={fetching}
            >
              <Text style={styles.loginText}>Verify OTP</Text>
            </Button> :
            <Button
              mode="contained"
              onPress={this.onPress}
              style={styles.btn}
              loading={fetching}
              disabled={fetching}
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </Button>
        }

        {
          showOTP ?
            <Button
              mode="flat"
              onPress={this.onSignIn}
              style={styles.forgot}
            >
              <Text>Sign In</Text>
            </Button> :
            <Button
              mode="flat"
              onPress={this.onForgot}
              style={styles.forgot}
            >
              <Text>Forgot Password</Text>
            </Button>
        }

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
    fetching: state.login.fetching,
    otpMessage: state.login.otpMessage,
    verifyOTPResponse: state.login.verifyOtpResponse,
    verifyOTPapiStatus: state.login.verifyOTPapiStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (phone, password) => dispatch(LoginActions.loginRequest(phone, password)),
    verifyOtpAction: (phone, otp) => dispatch(LoginActions.verifyOtp(phone, otp)),
    getOTPForNumber: (phone) => dispatch(LoginActions.otpRequest(phone))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
