import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, Keyboard } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox, Picker, DatePicker } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import { ToastActionsCreators } from 'react-native-redux-toast';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'
// Styles
import Styles from './Styles/RegisterStyle'

class Register extends Component {
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
      if (!regex.test(formObj['user[phone]'])) {
        this.props.errorToast("Enter Valid Phone Number'");
      } else {
        this.OTPFetched = false;
        const phone = formObj['user[phone]'];
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
      if(property === 'user[dob]') {
        const date = ("0" + formObj[property].getDate()).slice(-2);
        const month = ("0" + (formObj[property].getMonth()+1)).slice(-2);
        const year = formObj[property].getFullYear();
        data.append(property, `${year}-${month}-${date}`);
      } else {
        data.append(property, formObj[property]);
      }
    }
    this.props.attempSingUp(data);
  };
  render() {
    const { navigate } = this.props.navigation;
    const { otpStatus, fetching } = this.props;
    const { formObj } = this.state;
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
            <View style={Styles.navMiddle} >
              <Text style={Styles.logo}>Register</Text></View>
            <View style={Styles.navRight} />
          </View>
        </Header>

        <Content contentContainerStyle={Styles.layoutDefault}>

          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Image source={Images.sunil} style={[Styles.hImg]} />
              <Text style={Styles.hTopText}>Sign Up!</Text>
              <Text style={Styles.hTopDesc}>Create a new account</Text>
            </View>
            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={Styles.fRow}>
                  <Icon name='account' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Name'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    onChangeText={(text) => this.onFormChange(text, 'user[name]')}
                    keyboardType={'default'}
                    disabled={fetching}
                  />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='email' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Email Address'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.onFormChange(text, 'user[email]')}
                    disabled={fetching}
                  />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='mobile' type="FontAwesome" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Mobile Number'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => this.onFormChange(text, 'user[phone]')}
                    disabled={fetching}
                  />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='calendar-today' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Date Of Birth"
                    textStyle={Styles.fInput}
                    placeHolderTextStyle={{ color: 'rgba(36,42,56,0.4)' }}
                    onDateChange={(date) => this.onFormChange(date, 'user[dob]')}
                    disabled={fetching}
                  />
                </View>
                <View style={Styles.fSelect}>
                  <Icon name='account-card-details' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <View style={Styles.fPicker}>
                    <Picker
                      style={Styles.fPickerItem}
                      disabled={fetching}
                      textStyle={Styles.fInput}
                      selectedValue={formObj['user[gender]']}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onFormChange(itemValue, 'user[gender]')
                      }
                    >
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                      <Picker.Item label="Others" value="others" />
                    </Picker>
                  </View>
                </View>
                <View style={Styles.fRow}>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Password'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'default'}
                    secureTextEntry
                    onChangeText={(text) => this.onFormChange(text, 'user[password]')}
                    disabled={fetching}
                  />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Confirm Password'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    secureTextEntry
                    onChangeText={(text) => this.onFormChange(text, 'user[password_confirmation]')}
                    disabled={fetching}
                  />
                </View>
                {
                  otpStatus > 0 ?
                    <View style={Styles.fRow}>
                      <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                      <TextInput
                        style={Styles.fInput}
                        placeholder='OTP'
                        placeholderTextColor='rgba(36,42,56,0.4)'
                        onChangeText={(text) => this.onFormChange(text, 'otp')}
                        disabled={fetching}
                      />
                    </View> : null
                }
                <TouchableOpacity
                  style={Styles.fBtn}
                  onPress={this.handleNextClick}
                  disabled={fetching}
                >
                  <Text style={Styles.fBtnText}>{otpStatus !== 1 ? 'Next' : 'Register'}</Text>
                  <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.account}>
              <Text style={Styles.accountText}>Already have an account?</Text>
              <TouchableOpacity style={Styles.accountBtn} onPress={() => {
                navigate("Login")
              }}>
                <Text style={Styles.accountBtnText}>Sign in</Text>
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
    errorToast: (msg) => dispatch(ToastActionsCreators.displayError(msg)),
    attempSingUp: (data) => dispatch(LoginActions.signupRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)


// <TouchableOpacity style={Styles.fBtn} onPress={this.onFormSubmit}>
//                   <Text style={Styles.fBtnText}>Sign Up!</Text>
//                   <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
//                 </TouchableOpacity>