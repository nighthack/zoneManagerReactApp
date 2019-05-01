import React, { Component } from "react";
import { AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, RefreshControl } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import { connect } from "react-redux";
import { format } from 'date-fns';
import HeaderComponent from "../Components/HeaderComponent";
import DevelopmentWorksActions from "../Redux/DevelopmentWorkRedux";
import LoadingOverlay from '../Components/LoadingOverlay';
import FooterComponent from '../Components/ListFooter';
import ErrorPage from '../Components/NetworkErrorScreen';
import { Images } from '../Themes/'
// Styles
import Styles from './Styles/BenefeciaryDetailViewStyle'


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

class DevelopmentWorksList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }


  componentDidMount() {
    this.onTableFetchRequest(1);
  }
  goToPage = (option) => {
    const { lastCalledPage } = this.props;
    if (option === 'next') {
      this.onTableFetchRequest(lastCalledPage + 1);
    } else if (option === 'prev') {
      this.onTableFetchRequest(lastCalledPage - 1 >= 0 ? lastCalledPage - 1 : 1);
    } else if (option === 'first') {
      this.onTableFetchRequest(1);
    }
  }
  onTableFetchRequest = (pageID) => {
    const { fetching } = this.props;
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (!fetching) {
        this.props.getDevelopmentWorkslist(accessToken, pageID);
      }
    });
  }


  onRefresh = () => {
    this.onTableFetchRequest();
  }
  goToDetailView(selectedData) {
    const { navigate } = this.props.navigation;
    navigate("DevelopmentWorkDetail", { selectedData });
  }

  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <Text style={Styles.infoLabel}> ಸ್ಥಳ/Place</Text>
            <Text style={Styles.truckData}>{item.place}</Text>
            <Text style={Styles.infoLabel}>ಕಾಮಗಾರಿ/Work</Text>
            <Text style={Styles.truckTrip}>{item.name}</Text>
            <Text style={Styles.infoLabel}>ವಿವರಗಳು/Details</Text>
            <Text style={Styles.truckTrip}>{item.desc}</Text>
          </View>
          <View style={Styles.tripInfo}>
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text style={Styles.infoLabel}>ಇಲಾಖೆ/Department</Text>
              <Text style={Styles.truckData}>{item.department}</Text>
            </View>
            <View style={[Styles.rowSpaceAlignment, { marginTop: 10 }]}>
              <View style={Styles.tripPlaces}>
                <Icon
                  name="circle-o"
                  type="FontAwesome"
                  style={Styles.tripIcon}
                />
                <Text style={Styles.placeText}>ಮಂಜೂರಾದ ಮೊತ್ತ / Sanctioned</Text>
              </View>
              <View style={[Styles.tripPlaces, { flex: 2 }]}>
                <Icon
                  name="cash-multiple"
                  type="MaterialCommunityIcons"
                  style={Styles.checkIcon}
                />
                <Text style={[Styles.placeText]}>₹ {item.sanctioned_amount}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.tripInfo}>
            <View style={Styles.rowSpaceAlignment}>
              <View style={Styles.tripPlaces}>
                <Icon
                  name="circle-o"
                  type="FontAwesome"
                  style={Styles.tripIcon}
                />
                <Text style={Styles.placeText}>ಅಡಿಗಲ್ಲು ದಿನಾಂಕ / Foundation date</Text>
              </View>
              <View style={[Styles.tripPlaces, { flex: 2 }]}>
                <Icon
                  name="calendar-clock"
                  type="MaterialCommunityIcons"
                  style={Styles.checkIcon}
                />
                <Text style={Styles.placeText}>{item.foundation_date || 'NA'}</Text>
              </View>
            </View>
            <Text style={Styles.lineTracker}>|</Text>
            <View style={Styles.rowSpaceAlignment}>
              <View style={Styles.tripPlaces}>
                <Icon
                  name="circle-o"
                  type="FontAwesome"
                  style={Styles.tripIcon}
                />
                <Text style={Styles.placeText}>ಉದ್ಘಾಟನೆ ದಿನಾಂಕ/Inauguration Date</Text>
              </View>
              <View style={[Styles.tripPlaces, { flex: 2 }]}>
                <Icon
                  name="calendar-clock"
                  type="MaterialCommunityIcons"
                  style={Styles.checkIcon}
                />
                <Text style={Styles.placeText}>{item.inaugration_date || 'NA'}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.more}>
            <Text style={Styles.postedOn}>Last Updated at: {item.updated_at ? format(new Date(item.updated_at), 'DD MMM YYYY') : 'NA'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  renderContent = () => {
    const { listError, lastCalledPage, data, fetching } = this.props;
    if (listError) {
      return <ErrorPage status={listError} onButtonClick={() => this.onTableFetchRequest(1)} />
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={fetching}
                onRefresh={this.onRefresh}
              />
            }
            contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}
          >
            <Image source={Images.background} style={Styles.bgImg} />
            <View style={Styles.bgLayout}>
              <View style={Styles.hTop}>
                <Icon name='package' type="MaterialCommunityIcons" style={Styles.hImg} />
                <View style={Styles.hContent}>
                  <Text style={Styles.hTopText}>Development Works</Text>

                  <Text style={Styles.hTopDesc}>View all the development works</Text>
                </View>
              </View>
              <FlatList
                contentContainerStyle={Styles.listContent}
                keyExtractor={() => randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}
                data={data}
                removeClippedSubview
                renderItem={this.renderRow}
              />

            </View>
          </Content>

          <FooterComponent
            goToFirstPage={() => this.goToPage('first')}
            goToNextPage={() => this.goToPage('next')}
            goToPrevPage={() => this.goToPage('prev')}
            data={data}
            currentPage={lastCalledPage}
          />
        </View>
      )
    }
  }
  render() {
    const { data, fetching } = this.props;
    return (
      <Container>
        <HeaderComponent title={''} {...this.props} />
        {this.renderContent()}
        <LoadingOverlay
          visible={fetching}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.development.listData,
    fetching: state.development.fetching,
    lastCalledPage: state.development.lastCalledPage,
    listError: state.development.listError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDevelopmentWorkslist: (accessToken, pageNo) =>
      dispatch(DevelopmentWorksActions.devWorkOnListRequest(accessToken, pageNo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevelopmentWorksList);
