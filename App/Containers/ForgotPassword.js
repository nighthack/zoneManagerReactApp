import React, { Component } from 'react'
import { Keyboard, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native'
import { Container, Header, Content, Button, Icon, Text,  View } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import LoginActions from '../Redux/LoginRedux'
import { ToastActionsCreators } from 'react-native-redux-toast';
import LoadingOverlay from '../Components/LoadingOverlay';

// Styles
import Styles from './Styles/ForgotPasswordStyle'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formObj: {},
      errorObj: {},
    }
  }
  onFormChange = (value, key) => {
    const { formObj } = this.state;
    this.setState({
      formObj: { ...formObj, [key]: value }
    })
  }
  handleNextClick = () => {
    this.dismissKeyboard();
    const { formObj } = this.state;
    const errorObj = {};
    const regex = /^[6-9]\d{9}$/; //eslint-disable-line
    if (!regex.test(formObj['phone'])) {
      this.props.errorToast("Enter Valid Phone Number'");
      errorObj.phone = "Please Enter a valid Phone Number";
    } else {
      const phone = formObj['phone'];
      this.props.getOTPForNumber(phone)
    }
    this.setState({
      errorObj,
    })
  }

  goToPage = (route) => {
    const { navigation } = this.props;
    navigation.navigate(route);
    this.props.onNavigationResetState();
    this.setState({
      formObj: {},
      errorObj: {},
      showPassword: false,
    });
  }
  togglePasswordShow = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });

  }
  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  onFormSubmit = () => {
    const { formObj } = this.state;
    let data = new FormData();
    for (let property in formObj) {
      data.append(property, formObj[property]);
    }
    this.props.attempResetPassword(data);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { otpStatus, fetching, resetPasswordError } = this.props;
    const { errorObj, showPassword } = this.state;
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => this.goToPage('Login')}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle} />
            <View style={Styles.navRight} />
          </View>
        </Header>

        <Content contentContainerStyle={Styles.layoutDefault}>

          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='lock' type="MaterialCommunityIcons" style={Styles.hImg} />
              <Text style={Styles.hTopText}>Forgot password?</Text>
              <Text style={Styles.hTopDesc}>We just need your registered mobile number to reset password </Text>
            </View>
            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={(errorObj && errorObj.phone) ? Styles.fRowError : Styles.fRow }>
                  <Icon name='cellphone-android' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Mobile Number'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => this.onFormChange(text, 'phone')}
                    disabled={fetching}
                  />
                  <Text style={Styles.fErrorLabel}>{errorObj.phone}</Text>
                </View>
                {
                  otpStatus === 1 ?
                    <View style={(errorObj && errorObj.phone) ? Styles.fRowError : Styles.fRow }>
                      <Icon
                        name='message-circle'
                        type="Feather"
                        style={Styles.fIcon}
                      />
                      <TextInput
                        style={Styles.fInput}
                        placeholder='OTP'
                        placeholderTextColor='rgba(36,42,56,0.4)'
                        keyboardType={'phone-pad'}
                        onChangeText={(text) => this.onFormChange(text, 'otp')}
                        disabled={fetching}
                        textContentType="oneTimeCode"
                      />
                    </View> : null
                }
                {
                  otpStatus === 1 ?
                    <View style={resetPasswordError ? Styles.fRowError : Styles.fRow }>
                      <Icon name='textbox-password' type="MaterialCommunityIcons" style={Styles.fIcon} />
                      <TextInput
                        style={Styles.fInput}
                        secureTextEntry={!showPassword}
                        textContentType="password"
                        placeholder='New Password'
                        placeholderTextColor='rgba(36,42,56,0.4)'
                        onChangeText={(text) => this.onFormChange(text, 'password')}
                        disabled={fetching}
                      />
                                        <Icon
                    name={showPassword ? 'eye-off' :'eye'}
                    type="MaterialCommunityIcons"
                    style={Styles.fIcon}
                    onPress={this.togglePasswordShow}
                  />
                    </View> : null
                }
                {
                  typeof resetPasswordError === 'string' ? <Text style={Styles.errorText}>{resetPasswordError}</Text> : null
                }
                {
                  otpStatus ?
                  <View style={Styles.account}>
                    <TouchableOpacity style={Styles.accountBtn} onPress={this.handleNextClick}>
                      <Text style={Styles.accountBtnText}>Resend OTP</Text>
                    </TouchableOpacity>
                  </View> : null
                }
                {
                  !otpStatus ?
                    <TouchableOpacity
                      style={Styles.fBtn}
                      onPress={this.handleNextClick}
                      disabled={fetching}
                    >
                    <Text style={Styles.fBtnText}>Get OTP</Text>
                    <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
                  </TouchableOpacity>
                  : null
                }
                {
                  otpStatus === 1 ?
                    <TouchableOpacity
                      style={Styles.fBtn}
                      onPress={this.onFormSubmit}
                      disabled={fetching}
                    >
                    <Text style={Styles.fBtnText}>Reset Password</Text>
                    <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
                  </TouchableOpacity>
                  : null
                }
                {
                  otpStatus === 2 ?
                    <TouchableOpacity
                      style={Styles.fBtn}
                      onPress={this.handleNextClick}
                      disabled={fetching}
                    >
                    <Text style={Styles.fBtnText}>Resend OTP</Text>
                    <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
                  </TouchableOpacity>
                  : null
                }
              </View>
            </View>

            <View style={Styles.account}>
              <Text style={Styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity style={Styles.accountBtn} onPress={() => this.goToPage('RegisterScreen')}>
                <Text style={Styles.accountBtnText}>Sign up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <LoadingOverlay
          visible={fetching}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
        />
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.login);
  return {
    otpStatus: state.login.getOtpStatus,
    fetching: state.login.fetching,
    resetPasswordError: state.login.resetPasswordError,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getOTPForNumber: (phone) => dispatch(LoginActions.verifyUser(phone)),
    attempResetPassword: (data) => dispatch(LoginActions.resetPasswordRequest(data)),
    errorToast: (msg) => dispatch(ToastActionsCreators.displayError(msg)),
    onNavigationResetState: () => dispatch(LoginActions.logoutRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
