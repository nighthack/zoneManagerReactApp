import React, { Component } from 'react'
import { Keyboard, StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox, Picker } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import LoginActions from '../Redux/LoginRedux'
import { ToastActionsCreators } from 'react-native-redux-toast';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import Styles from './Styles/ForgotPasswordStyle'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formObj: {},
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
    const { otpStatus } = this.props;
    const { formObj } = this.state;
    if (otpStatus !== 1) {
      const regex = /^[6-9]\d{9}$/; //eslint-disable-line
      if (!regex.test(formObj['phone'])) {
        this.props.errorToast("Enter Valid Phone Number'");
      } else {
        this.OTPFetched = false;
        const phone = formObj['phone'];
        this.props.getOTPForNumber(phone)
      }
    } else {
      this.onFormSubmit();
    }

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
    this.props.attempresetPassword(data);
  };
  render() {
    const { navigate } = this.props.navigation;
    const { otpStatus, fetching } = this.props;
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => {
                navigate("Login")
              }}>
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
                <View style={Styles.fRow}>
                  <Icon name='cellphone-android' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Mobile Number'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => this.onFormChange(text, 'phone')}
                    disabled={fetching}
                  />
                </View>

                {
                  otpStatus > 0 ?
                    <View style={Styles.fRow}>
                      <Icon name='cellphone-android' type="MaterialCommunityIcons" style={Styles.fIcon} />
                      <TextInput
                        style={Styles.fInput}
                        placeholder='OTP'
                        placeholderTextColor='rgba(36,42,56,0.4)'
                        keyboardType={'phone-pad'}
                        onChangeText={(text) => this.onFormChange(text, 'otp')}
                        disabled={fetching}
                      />
                    </View> : null
                }
                {
                  otpStatus > 0 ?
                    <View style={Styles.fRow}>
                      <Icon name='cellphone-android' type="MaterialCommunityIcons" style={Styles.fIcon} />
                      <TextInput
                        style={Styles.fInput}
                        placeholder='New Password'
                        placeholderTextColor='rgba(36,42,56,0.4)'
                        onChangeText={(text) => this.onFormChange(text, 'password')}
                        disabled={fetching}
                      />
                    </View> : null
                }

                <TouchableOpacity
                  style={Styles.fBtn}
                  onPress={this.handleNextClick}
                  disabled={fetching}
                >
                  <Text style={Styles.fBtnText}>{otpStatus !== 1 ? 'Next' : 'Reset Password'}</Text>
                  <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={Styles.account}>
              <Text style={Styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity style={Styles.accountBtn} onPress={() => {
                navigate('RegisterScreen')
              }}>
                <Text style={Styles.accountBtnText}>Sign up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>

      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    otpStatus: state.login.getOtpStatus,
    fetching: state.login.fetching,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getOTPForNumber: (phone) => dispatch(LoginActions.otpRequest(phone)),
    attempresetPassword: (data) => dispatch(LoginActions.signupRequest(data)),
    errorToast: (msg) => dispatch(ToastActionsCreators.displayError(msg)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
