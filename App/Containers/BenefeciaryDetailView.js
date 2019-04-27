import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import { Images } from '../Themes/'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'

// Styles
import Styles from './Styles/BenefeciaryDetailViewStyle'

class BenefeciaryDetailView extends Component {

  componentDidMount() {
    const { navigation, token } = this.props;
    const selectedScheme = navigation.getParam('selectedScheme', null);
    if (token && token.user && selectedScheme && selectedScheme.id) {
      this.props.getDetailsForSelection(selectedScheme.id, token.user.access_token);
    }
  }

  render() {
    const { selectedScheme, navigation, token } = this.props;
     const parentProps = navigation.getParam('selectedScheme', null);
     if(parentProps.id !== selectedScheme.id) {
      this.props.getDetailsForSelection(parentProps.id, token.user.access_token);
     }
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
                    <View style={Styles.navMiddle}>
                      <Text style={Styles.logo}>Beneficiary Details</Text>
                    </View>
                    <View style={Styles.navRight} />
                </View>
            </Header>
            <Content contentContainerStyle={Styles.layoutDefault}>
                <Image source={Images.background} style={Styles.bgImg} />
                <View style={Styles.bgLayout}>
                    <View style={Styles.hTop}>
                        <View style={Styles.hContent}>
                            <Text style={Styles.hTopText}>{selectedScheme.beneficiary_name}</Text>
                            <Text style={Styles.hTopDesc}>Applied on: {selectedScheme.application_date}</Text>
                        </View>
                    </View>
                    <View style={Styles.tripItem}>
                        <View style={Styles.truckInfo}>
                            <View>
                                <Text style={Styles.truckTrip}>Status</Text>
                                <Text style={Styles.truckData}>{selectedScheme.status}</Text>
                            </View>
                        </View>
                        <View  style={Styles.truckInfo}>
                                                      <View>
                                <Text style={Styles.truckTrip}>Granted Relief</Text>
                                <Text style={Styles.truckData}>{selectedScheme.granted_relief}</Text>
                            </View>
                        </View>
                        <View style={Styles.msgBox}>
                            <Text style={Styles.msgText}>{selectedScheme.remarks || 'No Remarks'}</Text>
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
    token: state.login.user,
    selectedScheme: state.beneficiary.beneficiaryDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailsForSelection: (id, accessToken) => dispatch(BeneficiaryActions.beneficiaryDetailsRequest(id, accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BenefeciaryDetailView)
