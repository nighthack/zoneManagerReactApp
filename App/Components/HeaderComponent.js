import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Picker, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'
import Styles from './Styles/HeaderComponentStyle'
import { Images } from '../Themes/'

export default class HeaderComponent extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  toggleDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  }

  render() {
    const { title } = this.props;
    return (
      <Header style={Styles.navigation}>
        <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
        <View style={Styles.nav}>
          <View style={Styles.navLeft}>
            <TouchableOpacity style={Styles.navLeft} onPress={this.toggleDrawer}>
            <Image source={Images.menuIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.navMiddle}>
          <Text style={Styles.logo}>{ title }</Text>
          </View>
          <View style={Styles.navRight} />
        </View>
      </Header>
    )
  }
}
