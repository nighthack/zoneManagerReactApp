import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, AsyncStorage, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, TabHeading, ScrollableTab, Card, Left, Right, Body, Input, Tabs, Tab, Footer, View, FooterTab, Badge } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns';
import { Images } from '../Themes/'
import ErrorPage from '../Components/NetworkErrorScreen';
import LoadingOverlay from '../Components/LoadingOverlay';
import ImageViewerComponent from '../Components/ImageViewer';
import { NavigationEvents } from 'react-navigation';
// import EventActions from '../Redux/EventRedux'
import EventActions from '../Redux/EventRedux'
// Styles
import Styles from './Styles/EventsListStyle'

class EventDetail extends Component {

  refreshPage() {
    const { navigation, fetching } = this.props;
    const parentProps = navigation.getParam('selectedData', null);
    if (parentProps && parentProps.id) {
      AsyncStorage.getItem('accessToken').then((accessToken) => {
        if (!fetching) {
          this.props.getDetailsForSelection(accessToken, parentProps.id, );
        }
      });
    }
  }

  renderContent() {
    const { data, detailError } = this.props;
    if (detailError) {
      return <ErrorPage status={detailError} onButtonClick={() => this.refreshPage()} />
    }
    return (
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
                  <Text style={Styles.truckText}>{data.date} {data.start_time ? format(new Date(data.start_time), 'hh:mm A'): ''} - {data.end_time ? format(new Date(data.end_time), 'hh:mm A'): ''}</Text>
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
                <Text style={[Styles.placeText, { marginBottom: 10 }]}>ವಿವರಗಳು</Text>
                <Text style={Styles.msgText}>{data.details}</Text>
              </View>
              <View style={Styles.msgBox}>
                <Text style={[Styles.placeText, { marginBottom: 10 }]}>ಷರಾ</Text>
                <Text style={Styles.msgText}>{data.remarks}</Text>
              </View>
              <View style={Styles.orderDetails}>
                <Text style={Styles.orderText}>Updated at {data.updated_at ? format(new Date(data.updated_at), 'DD-MM-YYYY') : 'NA'}</Text>
              </View>
            </View>
          </View>
        </View>
        {
          data.images && data.images.length ? <ImageViewerComponent data={data.images}/> : null
        }
      </Content>
    )
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
    const { fetching } = this.props;
    return (
      <Container>
        <NavigationEvents
					onDidFocus={() => this.refreshPage()}
				/>
        {this.renderHeader()}
        {this.renderContent()}
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
    data: state.event.detailData,
    fectching: state.event.fetchingDetails,
    detailError: state.event.detailError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailsForSelection: (id, accessToken) => dispatch(EventActions.eventOnDetailRequest(id, accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
