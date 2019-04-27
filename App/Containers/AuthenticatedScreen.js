import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon, Text, View, Badge } from 'native-base'
import HeaderComponent from '../Components/HeaderComponent'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'
import LoadingOverlay from '../Components/LoadingOverlay';
import { Images } from '../Themes/'
import Styles from './Styles/BenefeciaryDetailViewStyle'

class AuthenticatedScreen extends Component {

  componentDidMount() {
    const { access_token } = this.props.user;
    this.props.getBeneficiarySchemesList(access_token);
    this.renderRow = this.renderRow.bind(this);
  }
  static navigationOptions = {
    headerTitle: 'Beneficiary Schemes',
  };

  goToBeneficiaryDetailView(selectedScheme) {
    const { navigate } = this.props.navigation;
    navigate('BenfeciaryDetail', { selectedScheme });

  }

  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={()=> this.goToBeneficiaryDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <View>
              <View>
                <Text style={Styles.msgName}>{item.beneficiary_name}</Text>
                <Text style={Styles.msgContent}>{item.beneficiary_phone}</Text>
                <Text style={Styles.msgContent}>{item.place_id}</Text>
                <Text style={Styles.msgDate}> Applied on {item.application_date}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.truckInfo}>
            <View>
            <Text style={Styles.truckTrip}>Status</Text>
            <Text style={Styles.truckData}>{item.status}</Text>
            </View>
          </View>
          <View  style={Styles.truckInfo}>
            <View>
              <Text style={Styles.truckTrip}>Granted Relief</Text>
              <Text style={Styles.truckData}>{item.granted_relief}</Text>
            </View>
          </View>
          <View style={Styles.msgBox}>
            <Text style={Styles.msgText}>{item.remarks || 'No Remarks'}</Text>
          </View>
      </View>
    </TouchableOpacity>
    )
  }

  render() {
    const { beneficiaryList, fetching } = this.props;
    return (
      <View style={Styles.layoutDefault}>
        <HeaderComponent title={'Beneficiary List'} {...this.props} />
        <FlatList
          contentContainerStyle={Styles.listContent}
          data={beneficiaryList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
        <LoadingOverlay
          visible={fetching}
        >
        <View>
            <Image
              source={Images.bjpGif}
              />
          </View>
        </LoadingOverlay>
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    beneficiaryList: state.beneficiary.beneficiaryList,
    fetching: state.beneficiary.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBeneficiarySchemesList: (accessToken) => dispatch(BeneficiaryActions.beneficiaryRequest(accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedScreen)
