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
import Styles from './Styles/BenefeciaryDetailViewStyle';
import ListCardComponent from '../Components/ListCardComponent';


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
class BeneficiaryList extends Component {
  
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

  formatData(data) {
    return(
      {
        title: data.beneficiary_name,
        image: data.image,
        subTitle: data.scheme_type,
        desc: data.granted_relief,
        createdDate: data.created_at ? format(new Date(data.created_at), 'DD-MM-YYYY') : 'NA',
        lastUpdatedAt: data.updated_at ? format(new Date(data.updated_at), 'DD-MM-YYYY') : 'NA',
        metaData: [ 
          {title: 'ಸ್ಥಳ', description: data.place},
          {title: 'ಅರ್ಜಿ ದಿನಾಂಕ', description: data.application_date},
          {title: 'ಹಾಲಿ ಸ್ಥಿತಿ', description: data.status},
          {title: 'ಷರಾ', description: data.remarks},
        ]
      }
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
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.goToDetailView(item)}>
                  <ListCardComponent
                    {...this.formatData(item)}
                  />
                </TouchableOpacity>
              )}
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