import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { StatusBar, TouchableOpacity, Image, } from 'react-native'
import { Container, Header, Content, Icon, Text, View } from 'native-base'
import { Images } from '../Themes/'
import LoadingOverlay from '../Components/LoadingOverlay';
import ImageViewerComponent from '../Components/ImageViewer';
import BeneficiaryActions from '../Redux/BeneficiaryRedux'

// Styles
import Styles from './Styles/BenefeciaryDetailViewStyle'

class BenefeciaryDetailView extends Component {

  componentDidMount() {
    const { navigation, user } = this.props;
    const selectedScheme = navigation.getParam('selectedScheme', null);
    if (user && selectedScheme && selectedScheme.id) {
      this.props.getDetailsForSelection(selectedScheme.id, user.access_token);
    }
  }

  render() {
    const { selectedScheme, navigation, user, fetching } = this.props;
    const parentProps = navigation.getParam('selectedScheme', null);
    if (parentProps.id !== selectedScheme.id) {
      this.props.getDetailsForSelection(parentProps.id, user.access_token);
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
        <Content contentContainerStyle={Styles.layoutDefault}>
          <Image source={Images.background} style={Styles.bgImg} />
          <View style={[Styles.bgLayout, Styles.marginTopSmall]}>
            <View style={Styles.hTop}>
              <Icon name='user-o' type='FontAwesome' style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>{selectedScheme.beneficiary_name}</Text>

                <View style={Styles.hContent}>
                  <Text style={[Styles.infoLabel, { color: '#FFD328' }]}>{selectedScheme.place}</Text>
                </View>
                <Text style={Styles.hTopDesc}>Applied on: {selectedScheme.application_date}</Text>
              </View>

            </View>
            <View style={[Styles.tripItem, Styles.marginTopSmall]}>
              <View style={[Styles.truckInfo, { flexDirection: 'column'}]}>
              <View>
                  <Text style={Styles.infoLabel}>ಯೋಜನೆ/Scheme</Text>
                  <Text style={Styles.truckData}>{selectedScheme.scheme_type}</Text>
                </View>
                <View>
                  <Text style={Styles.infoLabel}> ಹಾಲಿ ಸ್ಥಿತಿ/Status</Text>
                  <Text style={Styles.truckData}>{selectedScheme.status}</Text>
                </View>
              </View>
              <View style={Styles.truckInfo}>
                <View>
                  <Text style={Styles.infoLabel}>ಮಂಜುರಿ ವಿವರ/Granted Relief</Text>
                  <Text style={Styles.truckData}>{selectedScheme.granted_relief}</Text>
                </View>
              </View>
              <View style={Styles.msgBox}>
                <Text style={Styles.infoLabel}>ಷರಾ/Remarks</Text>
                <Text style={Styles.msgText}>{selectedScheme.remarks || 'No Remarks'}</Text>
              </View>
            </View>
          </View>
          {
            selectedScheme.images && selectedScheme.images.length ? <ImageViewerComponent data={selectedScheme.images}/> : null
          }

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
    selectedScheme: state.beneficiary.beneficiaryDetails,
    fetching: state.beneficiary.detailFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailsForSelection: (id, accessToken) => dispatch(BeneficiaryActions.beneficiaryDetailsRequest(id, accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BenefeciaryDetailView)



// {/* <View style={Styles.regForm}>
// <View style={Styles.infoBox}>
//   <View style={Styles.infoHeader}>
//     <Text style={Styles.infoHeaderText}>Documents</Text>
//   </View>
//   <View style={Styles.fRow}>
//     <TextInput style={Styles.fInput} placeholder='RC Book' placeholderTextColor='rgba(36,42,56,0.4)' />
//     <Icon name='file-document' type="MaterialCommunityIcons" style={Styles.fIcon} />
//   </View>
//   <View style={Styles.fRow}>
//     <TextInput style={Styles.fInput} placeholder='Insurance Document' placeholderTextColor='rgba(36,42,56,0.4)' />
//     <Icon name='file-document' type="MaterialCommunityIcons" style={Styles.fIcon} />
//   </View>
//   <View style={Styles.fRow}>
//     <TextInput style={Styles.fInput} placeholder='Pollution Document' placeholderTextColor='rgba(36,42,56,0.4)' />
//     <Icon name='file-document' type="MaterialCommunityIcons" style={Styles.fIcon} />
//   </View>
// </View>
// </View> */}