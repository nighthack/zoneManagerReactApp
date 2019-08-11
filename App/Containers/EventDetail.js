import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, AsyncStorage, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, TabHeading, ScrollableTab, Card, Left, Right, Body, Input, Tabs, Tab, Footer, View, FooterTab, Badge } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns';
import DetailView from '../Components/DevDetail';
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
    const componentPayload = {
      title: data.name,
      images: data.images,
      subTitle: data.venue,
      desc: data.details,
      createdDate: data.created_at ? format(new Date(data.created_at), 'DD-MM-YYYY') : 'NA',
      lastUpdatedAt: data.updated_at ? format(new Date(data.updated_at), 'DD-MM-YYYY') : 'NA',
      metaData: [ 
        {title: 'ಸಮಯಾವಕಾಶದ ವೇಳೆ', description: `${data.date} ${data.start_time ? format(new Date(data.start_time), 'hh:mm A') : ''} - ${data.end_time ? format(new Date(data.end_time), 'hh:mm A') : ''}`, iconName: 'calendar', hasIcon: true},
        {title: 'ಷರಾ', description: data.remarks},
      ]
    };
    if (detailError) {
      return <ErrorPage status={detailError} onButtonClick={() => this.refreshPage()} />
    }
    return (
      <DetailView data={componentPayload} />
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
