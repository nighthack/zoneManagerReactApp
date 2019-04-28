import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, TabHeading, ScrollableTab, Card, Left, Right, Body, Input, Tabs, Tab, Footer, View, FooterTab, Badge } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns';
import { Images } from '../Themes/'
import HeaderComponent from '../Components/HeaderComponent'
import LoadingOverlay from '../Components/LoadingOverlay';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions from '../Redux/EventRedux'

// Styles
import Styles from './Styles/EventsListStyle'

class EventDetail extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {
    const { navigation, user } = this.props;
    const selectedData = navigation.getParam('selectedData', null);
    if (user && selectedData && selectedData.id) {
      this.props.getDetailsForSelection(selectedData.id, user.access_token);
    }
  }
  renderContent() {
    const { data } = this.props;
    if(data) {
      return(
         <Content contentContainerStyle={Styles.layoutDefault}>
          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='calendar-check-o' type="FontAwesome" style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>{data.name}</Text>
              </View>
            </View>
            <View style={Styles.infoBox}>
              <View style={Styles.bookingItem}>
                <View style={Styles.tripTo} />
                <View style={Styles.truckInfo}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="date-range" type="MaterialIcons" style={Styles.truckIcon} />
                    <Text style={Styles.truckText}>{data.start_time ? format(new Date(data.start_time), 'DD-MMM-YY  hh:mm A') : 'NA'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={Styles.truckText}>To</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="date-range" type="MaterialIcons" style={Styles.truckIcon} />
                    <Text style={Styles.truckText}>{data.end_time ? format(new Date(data.end_time), 'DD-MMM-YY  hh:mm A') : 'NA'}</Text>
                  </View>
                </View>
                <View style={Styles.tripDest}>
                  <View style={Styles.locations}>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="location-pin" type="Entypo" style={[Styles.locationIcon, Styles.colorGreen]} />
                      <Text style={Styles.placeText}>{data.venue}</Text>
                    </View>
                  </View>
                </View>

                <View style={Styles.msgBox}>
                  <Text style={[Styles.placeText, { marginBottom: 10 }]}>ವಿವರಗಳು/Details</Text>
                  <Text style={Styles.msgText}>{data.details}</Text>
                </View>
                <View style={Styles.msgBox}>
                  <Text style={[Styles.placeText, { marginBottom: 10 }]}>ಷರಾ/Remarks</Text>
                  <Text style={Styles.msgText}>{data.remarks}</Text>
                </View>
                <View style={Styles.orderDetails}>
                  <Text style={Styles.orderText}>Updated at {data.updated_at ? format(new Date(data.updated_at), 'DD-MMM-YY') : 'NA'}</Text>
                </View>
              </View>
            </View>
          </View>
        </Content>
       )
    }
    return null;
  }

  renderHeader = () => {
    const { navigation } = this.props;
    return (
              <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => {
                navigation.navigate("EventsListScreen")
              }}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle} />
            <View style={Styles.navRight} />
          </View>
        </Header>
        )
  } 
  render() {
    const { data, navigation, user, fetching } = this.props;
    const parentProps = navigation.getParam('selectedData', null);
    if (parentProps && data && (parentProps.id !== data.id)) {
      this.props.getDetailsForSelection(parentProps.id, user.access_token);
    }
    return (
      <Container>
        {this.renderHeader()}
        {this.renderContent()}
        <LoadingOverlay visible={fetching}>
          <View>
            <Image source={Images.bjpGif} />
          </View>
        </LoadingOverlay>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    data: state.event.dataDetails,
    fectching: state.event.fetchingDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailsForSelection: (id, accessToken) => dispatch(EventActions.eventDetailsRequest(id, accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
