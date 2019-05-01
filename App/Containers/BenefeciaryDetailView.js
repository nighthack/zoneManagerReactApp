import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StatusBar, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { Container, Header, Content, Icon, Text, View } from 'native-base';
import { Images } from '../Themes/';
import ErrorPage from '../Components/NetworkErrorScreen';
import LoadingOverlay from '../Components/LoadingOverlay';
import ImageViewerComponent from '../Components/ImageViewer';
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
    if (detailError) {
      return <ErrorPage status={detailError} onButtonClick={() => this.refreshPage()} />
    }
    return (
      <Content contentContainerStyle={Styles.layoutDefault}>
        <Image source={Images.background} style={Styles.bgImg} />
        <View style={[Styles.bgLayout, Styles.marginTopSmall]}>
          <View style={Styles.hTop}>
            <Icon name='user-o' type='FontAwesome' style={Styles.hImg} />
            <View style={Styles.hContent}>
              <Text style={Styles.hTopText}>{data.beneficiary_name}</Text>

              <View style={Styles.hContent}>
                <Text style={[Styles.infoLabel, { color: '#FFD328' }]}>{data.place}</Text>
              </View>
              <Text style={Styles.hTopDesc}>Applied on: {data.application_date}</Text>
            </View>

          </View>
          <View style={[Styles.tripItem, Styles.marginTopSmall]}>
            <View style={[Styles.truckInfo, { flexDirection: 'column' }]}>
              <View>
                <Text style={Styles.infoLabel}>ಯೋಜನೆ/Scheme</Text>
                <Text style={Styles.truckData}>{data.scheme_type}</Text>
              </View>
              <View>
                <Text style={Styles.infoLabel}> ಹಾಲಿ ಸ್ಥಿತಿ/Status</Text>
                <Text style={Styles.truckData}>{data.status}</Text>
              </View>
            </View>
            <View style={Styles.truckInfo}>
              <View>
                <Text style={Styles.infoLabel}>ಮಂಜುರಿ ವಿವರ/Granted Relief</Text>
                <Text style={Styles.truckData}>{data.granted_relief}</Text>
              </View>
            </View>
            <View style={Styles.msgBox}>
              <Text style={Styles.infoLabel}>ಷರಾ/Remarks</Text>
              <Text style={Styles.msgText}>{data.remarks || 'No Remarks'}</Text>
            </View>
          </View>
        </View>
        {
          data.images && data.images.length ? <ImageViewerComponent data={data.images} /> : null
        }

      </Content>

    )
  }
  render() {

    const { data, navigation, fetching } = this.props;
    const parentProps = navigation.getParam('selectedData', null);
    if (parentProps && data && (parentProps.id !== data.id)) {
      const { fetching } = this.props;
      AsyncStorage.getItem('accessToken').then((accessToken) => {
        if (!fetching) {
          this.props.getDetailsForSelection(accessToken, parentProps.id);
        }
      });
    }
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => {
                navigation.navigate("Home")
              }}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle}>
              <Text style={Styles.logo}>Beneficiary Details</Text>
            </View>
            <View style={Styles.navRight} />
          </View>
        </Header>
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