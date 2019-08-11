import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StatusBar, TouchableOpacity, TextInput, Image, AsyncStorage, Dimensions, Keyboard } from 'react-native'
import { Container, Header, Content, Icon, Text, View  } from 'native-base'
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
    AsyncStorage.getItem('id_token').then((userToken) => {
      props.navigation.navigate(userToken ? 'App' : 'Auth');
   });
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
      errorObj.phone = 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ'
    } else {
      errorObj.phone = null;
    }
    if(!passwordRegx.test(password) || !password) {
      errorCount += 1;
      errorObj.password = "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಪರಿಶೀಲಿಸಿ"
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
      this.props.warningToast('ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇನ್ಪುಟ್ ಪರಿಶೀಲಿಸಿ');
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
              <Text style={Styles.hTopText}>ಲಾಗಿನ್</Text>
              <Text style={Styles.hTopDesc}>ಭಟ್ಕಲ್ ಕ್ಷೇತ್ರದಲ್ಲಿ ಅಭಿವೃದ್ಧಿಯನ್ನು ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ</Text>
            </View>
            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={(errorObj && errorObj.phone) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='cellphone-android' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    keyboardType="phone-pad" 
                    onChangeText={(text) => this.onFormChange(text, 'phone')}
                    style={Styles.fInput}
                    placeholder='ಮೊಬೈಲ್ ನಂಬರ'
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
                    placeholder='ಪಾಸ್ವರ್ಡ್'
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
                    <Text style={Styles.forgotPassword}>ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?</Text>
                  </TouchableOpacity>
                </View>
                {
                  error ? <Text style={Styles.errorText}>ಅಮಾನ್ಯ ರುಜುವಾತುಗಳು</Text> : null
                }
                <TouchableOpacity
                  style={Styles.fBtn}
                  onPress={this.onFormSubmit}
                  disabled={fetching}
                >
                  <Text style={Styles.fBtnText}>ಸೈನ್ ಇನ್</Text>
                  <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.account}>
              <Text style={Styles.accountText}>ನಿಮಗೆ ಖಾತೆ ಇಲ್ಲವೇ?</Text>
              <TouchableOpacity style={Styles.accountBtn} onPress={() => this.goToPage("RegisterScreen")}>
                <Text style={Styles.accountBtnText}>ಸೈನ್ ಅಪ್ ಮಾಡಿ!</Text>
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