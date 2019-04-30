import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, RefreshControl } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import HeaderComponent from '../Components/HeaderComponent'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'
import LoadingOverlay from '../Components/LoadingOverlay';
import LoginActions from '../Redux/LoginRedux'
import { NavigationEvents } from 'react-navigation';
import { Images } from '../Themes/'
import Styles from './Styles/BenefeciaryDetailViewStyle'


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
class BeneficiaryList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.onTableFetchRequest();
  }

  onTableFetchRequest = (pageNo) => {
    const { user, lastCalledPage, currentPage } = this.props;
    const { access_token } = user;
    let accessToken = access_token;
    if(!accessToken) {
      AsyncStorage.getItem('user').then((userToken) => {
        accessToken = JSON.parse(userToken).access_token;
        this.props.getBeneficiarySchemesList(accessToken, currentPage, lastCalledPage);
        this.props.saveUserToken(JSON.parse(userToken));
      });
    } else {
      this.props.getBeneficiarySchemesList(accessToken, currentPage, lastCalledPage);
    }
  }

  getMoreItems = () => {
    if (!this.props.fetching) {
      this.onTableFetchRequest();
    }
  }

  goToBeneficiaryDetailView(selectedScheme) {
    const { navigate } = this.props.navigation;
    navigate('BenfeciaryDetail', { selectedScheme });
  }

  onRefresh = () => {
    this.onTableFetchRequest();
  }

  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToBeneficiaryDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.infoLabel}>ಹೆಸರು/Name</Text>
              <Text style={Styles.truckData}>{item.beneficiary_name}</Text>
              <View>
                <View>
                  <Text style={Styles.infoLabel}>ಸ್ಥಳ/Place</Text>
                </View>
                <View style={Styles.tripPlaces}>
                  <Icon name='map-marker' type="FontAwesome" style={Styles.tripIcon} />
                  <Text style={Styles.placeText}>{item.place}</Text>
                </View>
                <View>
                  <Text style={Styles.infoLabel}>ಯೋಜನೆ/Scheme</Text>
                  <Text style={Styles.truckData}>{item.scheme_type}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.tripInfo}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginVertical: 5 }}>
              <Text style={Styles.infoLabel}> ಹಾಲಿ ಸ್ಥಿತಿ/Status </Text>
              <Text style={Styles.truckData}>{item.status}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginVertical: 5 }}>
              <Text style={Styles.infoLabel}>ಮಂಜುರಿ ವಿವರ/Granted Relief</Text>
              <Text style={Styles.truckData}>{item.granted_relief}</Text>
            </View>

          </View>
          <View style={Styles.more}>
            <Text style={Styles.postedOn}>Applied on: {item.application_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { beneficiaryList, fetching } = this.props;
    return (
      <Container>
        <HeaderComponent title={''} {...this.props} />
        <Content 
          contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}
          refreshControl={
            <RefreshControl
              refreshing={fetching} 
              onRefresh={this.onRefresh} 
            />
          }
        >
          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='package' type="MaterialCommunityIcons" style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>Beneficiary Schemes</Text>
                <Text style={Styles.hTopDesc}>View all the beneficiary schemes</Text>
              </View>
            </View>
            <FlatList
              contentContainerStyle={Styles.listContent}
              keyExtractor={() => randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}
              data={beneficiaryList}
              renderItem={this.renderRow}
              onEndReached={this.getMoreItems}
              removeClippedSubview
            />

          </View>
        </Content>
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
    user: state.login.user,
    beneficiaryList: state.beneficiary.beneficiaryList,
    fetching: state.beneficiary.fetching,
    lastCalledPage: state.beneficiary.lastCalledPage,
    currentPage: state.beneficiary.currentPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBeneficiarySchemesList: (accessToken, pageNo, lastCalledPage) => dispatch(BeneficiaryActions.beneficiaryRequest(accessToken, pageNo, lastCalledPage)),
    saveUserToken: (user) => dispatch(LoginActions.loginSuccess(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryList)




// <View style={Styles.layoutDefault}>
//   <NavigationEvents
//     onWillFocus={payload => console.log('will focus',payload)}
//     onDidFocus={payload => console.log('did focus',payload)}
//     onWillBlur={payload => console.log('will blur',payload)}
//     onDidBlur={payload => console.log('did blur',payload)}
//   />
//   <HeaderComponent title={'Beneficiary List'} {...this.props} />
//   <FlatList
//     contentContainerStyle={Styles.listContent}
//     data={beneficiaryList}
//     renderItem={this.renderRow}
//     keyExtractor={this.keyExtractor}
//     initialNumToRender={this.oneScreensWorth}
//     ListEmptyComponent={this.renderEmpty}
//     onEndReached={this.getMoreItems}
//   />
//   <LoadingOverlay
//     visible={fetching}
//   >
//   <View>
//       <Image
//         source={Images.bjpGif}
//         />
//     </View>
//   </LoadingOverlay>

// </View>


// <View style={Styles.search}>
//     <TextInput style={Styles.searchInput} placeholder='' placeholderTextColor='rgba(255,255,255,0.5)' />
//     <Icon name='search' type="FontAwesome" style={Styles.searchIcon} />
// </View>
