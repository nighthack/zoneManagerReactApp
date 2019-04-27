import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { StatusBar, TouchableOpacity, Image } from 'react-native'
import { Container, Header, Content, Icon, Text, View } from 'native-base'
import LoadingOverlay from '../Components/LoadingOverlay';
import { connect } from 'react-redux'
import { Images } from '../Themes/'

import DevelopmentWorksActions from "../Redux/DevelopmentWorkRedux";
// Styles

import Styles from "./Styles/DevelopmentWorksListStyle";
import { ScrollView } from 'react-native-gesture-handler';

class DevelopmentWorkDetail extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {
    const { navigation, user } = this.props;
    const selectedData = navigation.getParam('selectedData', null);
    if (user && selectedData && selectedData.id) {
      this.props.getDetailsForSelection(selectedData.id, user.access_token);
    }
  }
  renderDetailedView() {
    const { data } = this.props;
    if (data) {
      return (
        <Content contentContainerStyle={Styles.layoutDefault}>
          <Image source={Images.background} style={Styles.bgImg} />

          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='toolbox' type="FontAwesome5" style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>{data.name}</Text>
                <Text style={Styles.hTopDesc}>Place: {data.place_id}</Text>
              </View>
            </View>

            <View style={Styles.tripItem}>
              <Text style={Styles.cardItemLabel}>Description</Text>
              <View style={Styles.truckInfo}>
                <Text style={Styles.truckData}>{data.desc}</Text>
              </View>
              <Text style={Styles.cardItemLabel}>Status</Text>
              <View style={Styles.truckInfo}>
                <Text style={Styles.truckData}>{data.status}</Text>
              </View>
              <View style={Styles.tripInfo}>
                <View style={Styles.rowSpaceAlignment}>
                  <View style={Styles.tripPlaces}>
                    <Icon name='circle-o' type="FontAwesome" style={Styles.tripIcon} />
                    <Text style={Styles.placeText}>Estimated</Text>
                  </View>
                  <View style={Styles.tripPlaces}>
                    <Icon name='cash-multiple' type="MaterialCommunityIcons" style={Styles.checkIcon} />
                    <Text style={Styles.placeText}>{data.estimated_amount}</Text>
                  </View>
                </View>
                <Text style={Styles.lineTracker}>|</Text>
                <View style={Styles.rowSpaceAlignment}>
                  <View style={Styles.tripPlaces}>
                    <Icon name='circle-o' type="FontAwesome" style={Styles.tripIcon} />
                    <Text style={Styles.placeText}>Sanctioned</Text>
                  </View>
                  <View style={Styles.tripPlaces}>
                    <Icon name='cash-multiple' type="MaterialCommunityIcons" style={Styles.checkIcon} />
                    <Text style={Styles.placeText}>{data.sanctioned_amount}</Text>
                  </View>
                </View>
              </View>
              <View style={Styles.tripInfo}>
                <View style={Styles.rowSpaceAlignment}>
                  <View style={Styles.tripPlaces}>
                    <Icon name='circle-o' type="FontAwesome" style={Styles.tripIcon} />
                    <Text style={Styles.placeText}>Foundation Date</Text>
                  </View>
                  <View style={Styles.tripPlaces}>
                    <Icon name='calendar-clock' type="MaterialCommunityIcons" style={Styles.checkIcon} />
                    <Text style={Styles.placeText}>{data.foundation_date || 'NA'}</Text>
                  </View>
                </View>
                <Text style={Styles.lineTracker}>|</Text>
                <View style={Styles.rowSpaceAlignment}>
                  <View style={Styles.tripPlaces}>
                    <Icon name='circle-o' type="FontAwesome" style={Styles.tripIcon} />
                    <Text style={Styles.placeText}>Inauguration Date</Text>
                  </View>
                  <View style={Styles.tripPlaces}>
                    <Icon name='calendar-clock' type="MaterialCommunityIcons" style={Styles.checkIcon} />
                    <Text style={Styles.placeText}>{data.inaugration_date || 'NA'}</Text>
                  </View>
                </View>
              </View>
              {
                data.remarks ?
                  <View style={Styles.msgBox}>
                    <Text style={Styles.msgText}>{data.remarks || 'No Remarks'}</Text>
                  </View> : null
              }

              <View style={Styles.more}>
                <Text style={Styles.postedOn}>Last Updated at: {data.updated_at ? format(new Date(data.updated_at), 'DD MMM YYYY') : 'NA'}</Text>
              </View>
            </View>

          </View>
        </Content>
      )
    }
    return null;
  }
  render() {
    const { data, navigation, user, fetching } = this.props;
    const parentProps = navigation.getParam('selectedData', null);
    if (parentProps && data && (parentProps.id !== data.id)) {
      this.props.getDetailsForSelection(parentProps.id, user.access_token);
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
        <LoadingOverlay
          visible={fetching}
        >
          <View>
            <Image source={Images.bjpGif} />
          </View>
        </LoadingOverlay>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    data: state.development.dataDetails,
    fectching: state.development.fetchingDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailsForSelection: (id, accessToken) => dispatch(DevelopmentWorksActions.developmentWorkDetailsRequest(id, accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevelopmentWorkDetail)
