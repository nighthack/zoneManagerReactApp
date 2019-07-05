import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { StatusBar, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { Container, Header, Content, Icon, Text, View } from 'native-base'
import ErrorPage from '../Components/NetworkErrorScreen';
import ImageViewerComponent from '../Components/ImageViewer';
import LoadingOverlay from '../Components/LoadingOverlay';
import { connect } from 'react-redux'
import { Images } from '../Themes/'

import DevelopmentWorksActions from "../Redux/DevelopmentWorkRedux";
// Styles

import Styles from './Styles/BenefeciaryDetailViewStyle'

class DevelopmentWorkDetail extends Component {

  renderDetailedView() {
    const { data, detailError } = this.props;
    if (detailError) {
      return <ErrorPage status={detailError} onButtonClick={() => this.refreshPage()} />
    }
    return (
      <Content contentContainerStyle={Styles.layoutDefault}>
        <Image source={Images.background} style={Styles.bgImg} />
        <View style={[Styles.bgLayout, Styles.marginTopSmall, { marginBottom: 10}]}>
          <View style={Styles.hTop}>
            <Icon name='toolbox' type='FontAwesome5' style={Styles.hImg} />
            <View style={Styles.hContent}>
              <Text style={Styles.hTopText}>{data.name}</Text>
              <View style={Styles.hContent}>
                <Text style={[Styles.infoLabel, { color: '#FFD328', fontSize: 11 }]}>{data.place}</Text>
              </View>
            </View>
          </View>
          <View style={[Styles.tripItem, Styles.marginTopSmall]}>
            <View style={[Styles.truckInfo, { flexDirection: 'column'}]}>
            <View>
                <Text style={Styles.infoLabel}>ವಿವರಗಳು</Text>
                <Text style={Styles.truckData}>{data.desc}</Text>
              </View>
              <View>
                <Text style={Styles.infoLabel}> ಹಾಲಿ ಸ್ಥಿತಿ</Text>
                <Text style={Styles.truckData}>{data.status}</Text>
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
              <Text style={Styles.placeText}>ಅಡಿಗಲ್ಲು ದಿನಾಂಕ</Text>
            </View>
            <View style={[Styles.tripPlaces, { flex: 2 }]}>
              <Icon
                name="calendar-clock"
                type="MaterialCommunityIcons"
                style={Styles.checkIcon}
              />
              <Text style={Styles.placeText}>{data.foundation_date || 'NA'}</Text>
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
              <Text style={Styles.placeText}>ಉದ್ಘಾಟನೆ ದಿನಾಂಕ</Text>
            </View>
            <View style={[Styles.tripPlaces, { flex: 2 }]}>
              <Icon
                name="calendar-clock"
                type="MaterialCommunityIcons"
                style={Styles.checkIcon}
              />
              <Text style={Styles.placeText}>{data.inaugration_date || 'NA'}</Text>
            </View>
          </View>
        </View>
            <View style={Styles.truckInfo}>
              <View>
                <Text style={Styles.infoLabel}>ಇಲಾಖೆ</Text>
                <Text style={Styles.truckData}>{data.department}</Text>
              </View>
            </View>
            <View style={Styles.msgBox}>
              <Text style={Styles.infoLabel}>ಷರಾ</Text>
              <Text style={Styles.msgText}>{data.remarks || 'ಯಾವುದೇ ಟೀಕೆಗಳಿಲ್ಲ'}</Text>
            </View>
          </View>
        </View>
        {
          data.images && data.images.length ? <ImageViewerComponent data={data.images}/> : null
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
                navigation.navigate("DevelopmentWorksList")
              }}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle} />
            <View style={Styles.navRight} />
          </View>
        </Header>
        {this.renderDetailedView()}
        <LoadingOverlay  visible={fetching}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.development.detailData,
    fectching: state.development.fetchingDetails,
    detailError: state.development.detailError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailsForSelection: (id, accessToken) => dispatch(DevelopmentWorksActions.devWorkOnDetailRequest(id, accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevelopmentWorkDetail)