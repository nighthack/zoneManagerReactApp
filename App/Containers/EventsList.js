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


class EventsList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }


  componentDidMount() {
    this.onTableFetchRequest();
  }

  getMoreItems = () => {
    if (!this.props.fetching) {
      this.onTableFetchRequest();
    }
  }
  onTableFetchRequest = () => {
    const { user, lastCalledPage, currentPage } = this.props;
    const { access_token } = user;
    this.props.getEventsList(access_token, currentPage, lastCalledPage);
  }
  onRefresh = () => {
    this.onTableFetchRequest();
  }
  goToDetailView(selectedData) {
    const { navigate } = this.props.navigation;
    navigate("EventDetailScreen", { selectedData });
  }
  renderRow = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.goToDetailView(item)}>
        <View style={Styles.bookingItem}>
          <View style={Styles.tripTo}>
            <Text style={Styles.productText}>{item.name}</Text>
          </View>
          <View style={Styles.truckInfo}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="date-range" type="MaterialIcons" style={Styles.truckIcon} />
              <Text style={Styles.truckText}>{item.date} {item.start_time ? format(new Date(item.start_time), 'hh:mm A'): ''} - {item.end_time ? format(new Date(item.end_time), 'hh:mm A'): ''}</Text>
            </View>
          </View>
          <View style={Styles.tripDest}>
            <View style={Styles.locations}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="location-pin" type="Entypo" style={[Styles.locationIcon, Styles.colorGreen]} />
                <Text style={Styles.placeText}>{item.venue}</Text>
              </View>
            </View>
          </View>

          <View style={Styles.msgBox}>
            <Text style={Styles.msgText}>{item.details}
            </Text>
          </View>
          <View style={Styles.orderDetails}>
            <Text style={Styles.orderText}>Updated at {item.updated_at ? format(new Date(item.updated_at), 'DD-MMM-YY') : 'NA'}</Text>
          </View>
        </View>
      </TouchableOpacity>)
  }
  render() {
    const { data, fetching } = this.props;
    return (
      <Container>
        <HeaderComponent title={'Events'} {...this.props} />
        <Content contentContainerStyle={[Styles.layoutDefault,  { flex: 1 } ]}>
          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='calendar-check-o' type="FontAwesome" style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>Events</Text>
                <Text style={Styles.hTopDesc}>List of All Public Meetings and Events of our MLA</Text>
              </View>
            </View>
             <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderRow}
                onEndReached={this.getMoreItems}
                removeClippedSubview
                onRefresh={this.onRefresh}
                refreshing={fetching}
              />
        <LoadingOverlay
          visible={fetching}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
        />
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    data: state.event.eventsList,
    fetching: state.event.fetching,
    lastCalledPage: state.event.lastCalledPage,
    currentPage: state.event.currentPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventsList: (accessToken, pageNo, lastCalledPage) =>
      dispatch(EventActions.eventRequest(accessToken, pageNo, lastCalledPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList)
