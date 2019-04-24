import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, Keyboard } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox, Picker } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes/'
import LoginActions from '../Redux/LoginRedux'
// Styles
import Styles from './Styles/LoginScreenStyle'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formObj: {

      }
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
  onFormSubmit = () => {
    this.dismissKeyboard();
    const regex = /^[6-9]\d{9}$/; //eslint-disable-line
    const { phone, password } = this.state.formObj;
    if (regex.test(phone) && password.length > 0) {
      this.isAttempting = true
      this.props.attemptLogin(phone, password);
    }
  };
  render() {
    const { fetching, navigation } = this.props;
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
                <View style={Styles.fRow}>
                  <Icon name='cellphone-android' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput keyboardType="phone-pad" onChangeText={(text) => this.onFormChange(text, 'phone')} style={Styles.fInput} placeholder='Mobile Number' placeholderTextColor='rgba(36,42,56,0.4)' />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput secureTextEntry onChangeText={(text) => this.onFormChange(text, 'password')} style={Styles.fInput} placeholder='Password' placeholderTextColor='rgba(36,42,56,0.4)' />
                </View>
                <View>
                  <TouchableOpacity style={Styles.accountBtn} onPress={() => {
                    navigate("PublicForgotPassword")
                  }}>
                    <Text style={Styles.forgotPassword}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>
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
              <TouchableOpacity style={Styles.accountBtn} onPress={() => {
                navigate("RegisterScreen")
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
    fetching: state.login.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (phone, password) => dispatch(LoginActions.loginRequest(phone, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)