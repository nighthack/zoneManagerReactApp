import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, Keyboard } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox, Picker } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

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

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  onFormSubmit = () => {
    this.dismissKeyboard();
    console.log('hi');
    // const regex = /^[6-9]\d{9}$/; //eslint-disable-line
    // const { phone, password } = this.state.formObj;
    // if (regex.test(phone) && password.length > 0) {
    //   this.isAttempting = true
    //   this.props.attemptLogin(phone, password);
    // }
  };
  render() {
    const { navigate } = this.props.navigation;
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
                  <TextInput style={Styles.fInput} placeholder='Name' placeholderTextColor='rgba(36,42,56,0.4)' />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='email' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput style={Styles.fInput} placeholder='Email Address' placeholderTextColor='rgba(36,42,56,0.4)' />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='mobile' type="FontAwesome" style={Styles.fIcon} />
                  <TextInput style={Styles.fInput} placeholder='Mobile Number' placeholderTextColor='rgba(36,42,56,0.4)' />
                </View>
                <View style={Styles.fSelect}>
                  <Icon name='account-card-details' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <View style={Styles.fPicker}>
                    <Picker
                      style={Styles.fPickerItem}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onFormChange(itemValue, 'gender')
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
                  <TextInput style={Styles.fInput} placeholder='Password' placeholderTextColor='rgba(36,42,56,0.4)' />
                </View>
                <View style={Styles.fRow}>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput style={Styles.fInput} placeholder='Confirm Password' placeholderTextColor='rgba(36,42,56,0.4)' />
                </View>
                <TouchableOpacity style={Styles.fBtn} onPress={this.onFormSubmit}>
                  <Text style={Styles.fBtnText}>Sign Up!</Text>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
