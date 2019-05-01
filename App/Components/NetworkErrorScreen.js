import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import { Images } from '../Themes/'
import Styles from './Styles/NetworkErrorScreenStyle'

export default class NetworkErrorScreen extends Component {
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

  render() {
    const { onButtonClick, status } = this.props;
    return (
      <Content contentContainerStyle={Styles.layoutDefault}>
        <Image source={Images.background} style={Styles.bgImg} />
        <View style={Styles.bgLayout}>
          <View style={Styles.hTop}>
            <Icon name='signal-wifi-off' type="MaterialIcons" style={Styles.hImg} />
            <View style={Styles.hContent}>
              <Text style={Styles.hTopText}>{status || 'Network Error'}</Text>
              <Text style={Styles.hTopDesc}>Oops!! there is some trouble</Text>
            </View>
          </View>
          <View style={Styles.tripItem}>
            <View style={Styles.truckInfo}>
              <View>
                <Text style={Styles.truckTrip}>Sorry</Text>
                <Text style={Styles.truckData}>Looks Like the internet is too slow please try back in some time or click below to retry</Text>
              </View>
            </View>
            <View style={Styles.decisionBox}>
              <TouchableOpacity style={Styles.acceptBtn} onPress={onButtonClick}>
                <Text style={Styles.btnText}>Retry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Content>

    )
  }
}
