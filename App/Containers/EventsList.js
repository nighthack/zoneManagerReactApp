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
    this.pageNo = 1;
    this.state = {

    };
  }



componentWillReceiveProps(nextProps) {
  const { data } = nextProps;
  const { canModifyPageNo } = this.state;
  if (data && this.props.data && data.legnth === this.props.data.legnth && canModifyPageNo) {
    this.pageNo -= 1;
    this.setState({
      canModifyPageNo: false,
    });
  }
}

  componentDidMount() {
    this.onTableFetchRequest(1);
  }

  getMoreItems = () => {
    if(!this.props.fetching) {
			this.pageNo += 1;
			this.onTableFetchRequest(this.pageNo);
			this.setState({
				canModifyPageNo: true,
			});
		}
  }
 onTableFetchRequest = (pageNo) => {
    const { user } = this.props;
    this.props.getEventsList(user.access_token, pageNo);
  }

  goToDetailView(selectedData) {
    const { navigate } = this.props.navigation;
    navigate("EventDetailScreen", { selectedData });
  }
  renderRow = ({ item, index }) => {
    console.log(item);
    return (
      <TouchableOpacity onPress={() => this.goToDetailView(item)}>
        <View style={Styles.bookingItem}>
          <View style={Styles.tripTo}>
            <Text style={Styles.productText}>{item.name}</Text>
          </View>
          <View style={Styles.truckInfo}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="date-range" type="MaterialIcons" style={Styles.truckIcon} />
              <Text style={Styles.truckText}>{item.date} {item.start_time ? format(new Date(item.start_time), 'hh:mm A'): ''}</Text>
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
              />
            <LoadingOverlay
              visible={fetching}
            >
              <View>
                <Image source={Images.bjpGif} />
              </View>
            </LoadingOverlay>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventsList: (accessToken, pageNo) =>
      dispatch(EventActions.eventRequest(accessToken, pageNo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList)
