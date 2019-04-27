import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, Keyboard } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox, Picker } from 'native-base'
import { ToastActionsCreators } from 'react-native-redux-toast';
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes/'
import LoginActions from '../Redux/LoginRedux'
import LoadingOverlay from '../Components/LoadingOverlay';
// Styles
import Styles from './Styles/LoginScreenStyle'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formObj: {},
      errorObj: {},
      showPassword: false,
    }
  }
  dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  
  onFormChange = (value, key) => {
    const { formObj } = this.state;
    this.setState({
      formObj: { ...formObj, [key]: value }
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
  onFormSubmit = () => {
    this.dismissKeyboard();
    const regex = /^[6-9]\d{9}$/; //eslint-disable-line
    const passwordRegx = /.*\S.*/;
    const { phone, password } = this.state.formObj;
    let errorCount = 0;
    const errorObj = {};
    if(!regex.test(phone)) {
      errorCount += 1;
      errorObj.phone = 'Please Enter a valid Phone Number'
    } else {
      errorObj.phone = null;
    }
    if(!passwordRegx.test(password) || !password) {
      errorCount += 1;
      errorObj.password = "Please check your password"
    } else {
       errorObj.password = null;
    }
    this.setState({
      errorObj,
    })
    if (!errorCount) {
      this.isAttempting = true
      this.props.attemptLogin(phone, password);
    } else {
      this.props.warningToast('Please check your input');
    }
  };
  render() {
    const { fetching, navigation, error } = this.props;
    const { formObj, errorObj, showPassword } = this.state;
    const { navigate } = navigation;
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navMiddle} />
            <View style={Styles.navRight} />
          </View>
        </Header>

        <Content contentContainerStyle={Styles.layoutDefault}>

          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
            <Image source={Images.sunil} style={[Styles.hImg]}/>
              <Text style={Styles.hTopText}>Login</Text>
              <Text style={Styles.hTopDesc}>Login to see development in Bhatkal</Text>
            </View>
            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={(errorObj && errorObj.phone) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='cellphone-android' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    keyboardType="phone-pad" 
                    onChangeText={(text) => this.onFormChange(text, 'phone')}
                    style={Styles.fInput}
                    placeholder='Mobile Number'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    textContentType="telephoneNumber"
                    value={formObj.phone}
                   />
                    <Text style={Styles.fErrorLabel}>{errorObj.phone}</Text>
                </View>
               
                <View style={(errorObj && errorObj.password) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => this.onFormChange(text, 'password')}
                    style={Styles.fInput}
                    placeholder='Password'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    textContentType="password"
                    value={formObj.password}
                  />
                  <Icon
                    name={showPassword ? 'eye-off' :'eye'}
                    type="MaterialCommunityIcons"
                    style={Styles.fIcon}
                    onPress={this.togglePasswordShow}
                  />
                   <Text style={Styles.fErrorLabel}>{errorObj.password}</Text>
                </View>
               
                <View>
                  <TouchableOpacity style={Styles.accountBtn} onPress={() => this.goToPage('ForgotPassword')}>
                    <Text style={Styles.forgotPassword}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>
                {
                  error ? <Text style={Styles.errorText}>Invalid Credentials</Text> : null
                }
                <TouchableOpacity
                  style={Styles.fBtn}
                  onPress={this.onFormSubmit}
                  disabled={fetching}
                >
                  <Text style={Styles.fBtnText}>Sign in</Text>
                  <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.account}>
              <Text style={Styles.accountText}>Don't you have an account?</Text>
              <TouchableOpacity style={Styles.accountBtn} onPress={() => this.goToPage("RegisterScreen")}>
                <Text style={Styles.accountBtnText}>Sign up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <LoadingOverlay
          visible={fetching}
        >
        <View>
            <Image
              source={Images.bjpGif}
              />
          </View>
        </LoadingOverlay>
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (phone, password) => dispatch(LoginActions.loginRequest(phone, password)),
    warningToast: (msg) => dispatch(ToastActionsCreators.displayWarning(msg)),
    errorToast: (msg) => dispatch(ToastActionsCreators.displayError(msg)),
    onNavigationResetState: () => dispatch(LoginActions.resetStateOnNavigation()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)