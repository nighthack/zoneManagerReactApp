import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, RefreshControl } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'
import { format } from 'date-fns';
import HeaderComponent from '../Components/HeaderComponent'
import LoadingOverlay from '../Components/LoadingOverlay';
import FooterComponent from '../Components/ListFooter';
import ErrorPage from '../Components/NetworkErrorScreen';
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

  goToPage = (option) => {
    const { lastCalledPage } = this.props;
    if (option === 'next') {
      this.onTableFetchRequest(lastCalledPage + 1);
    } else if (option === 'prev') {
      this.onTableFetchRequest(lastCalledPage - 1 >= 0 ? lastCalledPage - 1 : 1);
    } else if (option === 'first') {
      this.onTableFetchRequest(1);
    } else if(option === 'refresh') {
      this.onTableFetchRequest(lastCalledPage);
    }
  }

  onTableFetchRequest = (pageID) => {
    const { fetching } = this.props;
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (!fetching) {
        this.props.getListData(accessToken, pageID);
      }
    });
  }

  goToBeneficiaryDetailView(selectedData) {
    const { navigate } = this.props.navigation;
    navigate('BenfeciaryDetail', { selectedData });
  }

  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToBeneficiaryDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.infoLabel}>ಹೆಸರು</Text>
              <Text style={Styles.truckData}>{item.beneficiary_name}</Text>
              <View>
                <View>
                  <Text style={Styles.infoLabel}>ಸ್ಥಳ</Text>
                </View>
                <View style={Styles.tripPlaces}>
                  <Icon name='map-marker' type="FontAwesome" style={Styles.tripIcon} />
                  <Text style={Styles.placeText}>{item.place}</Text>
                </View>
                <View>
                  <Text style={Styles.infoLabel}>ಯೋಜನೆ</Text>
                  <Text style={Styles.truckData}>{item.scheme_type}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.tripInfo}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginVertical: 5 }}>
              <Text style={Styles.infoLabel}> ಹಾಲಿ ಸ್ಥಿತಿ </Text>
              <Text style={Styles.truckData}>{item.status}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginVertical: 5 }}>
              <Text style={Styles.infoLabel}>ಮಂಜುರಿ ವಿವರ</Text>
              <Text style={Styles.truckData}>{item.granted_relief}</Text>
            </View>

          </View>
          <View style={Styles.more}>
            <Text style={Styles.postedOn}>ಅರ್ಜಿ ದಿನಾಂಕ: {item.application_date ? format(new Date(item.application_date), 'DD-MM-YYYY') : 'NA'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderContent = () => {
    const { listError, lastCalledPage, data, fetching } = this.props;
    if (listError) {
      return <ErrorPage status={listError} onButtonClick={() => this.onTableFetchRequest(1)} />
    }
    return (
      <View style={{ flex: 1 }}>
        <Content
          contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}
        >
          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='package' type="MaterialCommunityIcons" style={Styles.hImg} />
              <TouchableOpacity style={Styles.hContent} onPress={() => {
                this.goToPage('first')
              }}>
                <Text style={Styles.hTopText}>ಫಲಾನುಭವಿಗಳು</Text>
                <Text style={Styles.hTopDesc}>ಎಲ್ಲಾ ಫಲಾನುಭವಿ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ marginBottom: 80 }}
              contentContainerStyle={Styles.listContent}
              keyExtractor={() => randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}
              data={data}
              renderItem={this.renderRow}
              removeClippedSubview
            />
          </View>
        </Content>
        <FooterComponent
          goToFirstPage={() => this.goToPage('first')}
          goToNextPage={() => this.goToPage('next')}
          goToPrevPage={() => this.goToPage('prev')}
          refreshPage={()=> this.goToPage('refresh')}
          data={data}
          currentPage={lastCalledPage}
        />
      </View>
    )
  }

  render() {
    const { fetching } = this.props;
    return (
      <Container>
        <NavigationEvents
					onDidFocus={() => this.goToPage('first')}
				/>
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


    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.beneficiary.listData,
    fetching: state.beneficiary.fetching,
    lastCalledPage: state.beneficiary.lastCalledPage,
    currentPage: state.beneficiary.pageNo,
    listError: state.beneficiary.listError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListData: (accessToken, pageNo, lastCalledPage) =>
      dispatch(BeneficiaryActions.beneficiaryOnListRequest(accessToken, pageNo, lastCalledPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryList)