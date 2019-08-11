import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StatusBar, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { CustomActivityIndicator } from '../Components/ui';
import { format } from 'date-fns';
import { Container, Header, Content, Icon, Text, View } from 'native-base';
import ErrorPage from '../Components/NetworkErrorScreen';
import DetailView from '../Components/DevDetail';
import BeneficiaryActions from '../Redux/BeneficiaryRedux';

// Styles
import Styles from './Styles/BenefeciaryDetailViewStyle'

class BenefeciaryDetailView extends Component {

  refreshPage() {
    const { navigation, fetching } = this.props;
    const parentProps = navigation.getParam('selectedData', null);
    if (parentProps && parentProps.id) {
      AsyncStorage.getItem('accessToken').then((accessToken) => {
        if (!fetching) {
          this.props.getDetailsForSelection(accessToken, parentProps.id);
        }
      });
    }
  }

  renderContent() {
    const { data, detailError } = this.props;
    const componentPayload = {
      title: data.beneficiary_name,
      images: data.images,
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
    };
    if (detailError) {
      return <ErrorPage status={detailError} onButtonClick={() => this.refreshPage()} />
    }
    return (
      <DetailView data={componentPayload} />
    )
  }
  render() {
    const { navigation, fetching } = this.props;
    return (
      <Container>
        <NavigationEvents
          onDidFocus={() => this.refreshPage()}
        />
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => {
                navigation.navigate("BeneficiaryListingScreen")
              }}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle}>
              <Text style={Styles.logo}>ಫಲಾನುಭವಿ ವಿವರಗಳು</Text>
            </View>
            <View style={Styles.navRight} />
          </View>
        </Header>
        {this.renderContent()}
        {fetching ? <CustomActivityIndicator /> : null}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.beneficiary.detailData,
    fectching: state.beneficiary.fetchingDetails,
    detailError: state.beneficiary.detailError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailsForSelection: (id, accessToken) => dispatch(BeneficiaryActions.beneficiaryOnDetailRequest(id, accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BenefeciaryDetailView)