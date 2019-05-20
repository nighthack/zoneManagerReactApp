import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Picker, Input, Item, DatePicker, Footer, View, FooterTab, Badge } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import Styles from './Styles/UserSettingsStyle'

class UserSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formObj: props.userObj ? props.userObj.user : {},
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      formObj: nextProps.userObj ? nextProps.userObj.user : {},
    });
  }
  onFormChange = (value, key) => {
    const { formObj } = this.state;
    this.setState({
      formObj: { ...formObj, [key]: value }
    })
  }

  render() {
    const { formObj } = this.state;
    const { fetching, user, navigation, userObj } = this.props;
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => {
                navigation.navigate("Home")
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
              <View>
                <Icon name='user' type="FontAwesome5" style={Styles.hUserIcon} />
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                <Text style={Styles.hTopText}>Hey {userObj.user.name}</Text>
                <Text style={Styles.hTopDesc}>Manage your profile</Text>
              </View>
            </View>

            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={Styles.infoHeader}>
                  <Text style={Styles.infoHeaderText}>Basic Information</Text>
                </View>
                <View style={Styles.fRow}>
                  <TextInput
                    style={Styles.fInput}
                    placeholder='First Name/ಮೊದಲ ಹೆಸರು'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    value={formObj.first_name}
                    editable={false}
                  />
                </View>
                <View style={Styles.fRow}>
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Last Name/ಕೊನೆಯ ಹೆಸರು'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    value={formObj.last_name}
                    editable={false}
                  />
                </View>
                <View style={Styles.fRow}>
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Gender'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    value={formObj.gender}
                    editable={false}
                  />
                </View>
              </View>
            </View>

            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={Styles.infoHeader}>
                  <Text style={Styles.infoHeaderText}>Address Information</Text>
                </View>
                <View style={Styles.fRow}>
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Address'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    value={formObj.address}
                    editable={false}
                  />
                </View>
                <View style={Styles.fRow}>
                  <TextInput 
                    style={Styles.fInput} 
                    placeholder='Postal Code' 
                    placeholderTextColor='rgba(36,42,56,0.4)' 
                    value={formObj.pincode}
                    editable={false}
                  />
                </View>
              </View>
            </View>

            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={Styles.infoHeader}>
                  <Text style={Styles.infoHeaderText}>Contact Information</Text>
                </View>
                <View style={Styles.fRow}>
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Phone Number'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    value={formObj.phone}
                    editable={false}
                  />
                </View>
                <View style={Styles.fRow}>
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Email ID'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    value={formObj.email}
                    editable={false}
                  />
                </View>
              </View>
            </View>
          
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userObj: state.root.userDetails,
    fetching: state.root.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
