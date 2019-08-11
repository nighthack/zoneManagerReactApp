import React, { Component } from "react";
import { AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, RefreshControl } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import { connect } from "react-redux";
import { format } from 'date-fns';
import { NavigationEvents } from 'react-navigation';
import HeaderComponent from "../Components/HeaderComponent";
import DevelopmentWorksActions from "../Redux/DevelopmentWorkRedux";
import { CustomActivityIndicator } from '../Components/ui';
import FooterComponent from '../Components/ListFooter';
import ErrorPage from '../Components/NetworkErrorScreen';
import { Images } from '../Themes/'
// Styles
import Styles from './Styles/BenefeciaryDetailViewStyle';
import ListCardComponent from '../Components/ListCardComponent';


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

class DevelopmentWorksList extends Component {

  goToPage = (option) => {
    const { lastCalledPage } = this.props;
    if (option === 'next') {
      this.onTableFetchRequest(lastCalledPage + 1);
    } else if (option === 'prev') {
      this.onTableFetchRequest(lastCalledPage - 1 >= 0 ? lastCalledPage - 1 : 1);
    } else if (option === 'first') {
      this.onTableFetchRequest(1);
    } else if (option === 'refresh') {
      this.onTableFetchRequest(lastCalledPage);
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

  formatData(data) {
    return(
      {
        title: data.name,
        image: data.image,
        subTitle: data.department,
        desc: data.desc,
        createdDate: data.created_at ? format(new Date(data.created_at), 'DD-MM-YYYY') : 'NA',
        lastUpdatedAt: data.updated_at ? format(new Date(data.updated_at), 'DD-MM-YYYY') : 'NA',
        metaData: [ 
          {title: 'ಸ್ಥಳ', description: data.place},
          {title: 'ಮಂಜೂರಾದ ಮೊತ್ತ', description: data.sanctioned_amount, hasIcon: true, iconName: 'cash-multiple', isCash: true, },
          {title: 'ಹಾಲಿ ಸ್ಥಿತಿ', description: data.status},
          {title: 'ಅಡಿಗಲ್ಲು ದಿನಾಂಕ', description: data.foundation_date, iconName: 'calendar', hasIcon: true},
          {title: 'ಉದ್ಘಾಟನೆ ದಿನಾಂಕ', description: data.inaugration_date, iconName: 'calendar', hasIcon: true},
          {title: 'ಷರಾ', description: data.remarks},
        ]
      }
    )
  }


  renderContent = () => {
    const { listError, lastCalledPage, data, fetching } = this.props;
    if (listError) {
      return <ErrorPage status={listError} onButtonClick={() => this.onTableFetchRequest(1)} />
    } else {
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
                  <Text style={Styles.hTopText}>Test</Text>

                  <Text style={Styles.hTopDesc}>View all the development works</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                style={{ marginBottom: 80 }}
                contentContainerStyle={Styles.listContent}
                keyExtractor={() => randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}
                data={data}
                removeClippedSubview
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.goToDetailView(item)}>
                    <ListCardComponent
                      {...this.formatData(item)}
                    />
                  </TouchableOpacity>
                )}
              />

            </View>
          </Content>

          <FooterComponent
            goToFirstPage={() => this.goToPage('first')}
            goToNextPage={() => this.goToPage('next')}
            goToPrevPage={() => this.goToPage('prev')}
            refreshPage={() => this.goToPage('refresh')}
            data={data}
            currentPage={lastCalledPage}
          />
        </View>
      )
    }
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
        {
          fetching ? <CustomActivityIndicator /> : null
        }
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
