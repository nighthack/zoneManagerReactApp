import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, FlatList } from 'react-native'
import { Icon, Text, View, Badge } from 'native-base'
import HeaderComponent from '../Components/HeaderComponent'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'

// Styles
import Styles from './Styles/AuthenticatedScreenStyle'

class AuthenticatedScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {
    const { user } = this.props.token;
    this.props.getBeneficiarySchemesList(user.access_token);
  }
  static navigationOptions = {
    headerTitle: 'Beneficiary Schemes',
  };
  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToBeneficiaryDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.truckTrip}>{item.name}</Text>
              <Text style={Styles.truckData}>{item.desc}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              </View>
            </View>
          </View>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.placeText}>Sanctioned</Text>
              <Text style={Styles.price}>₹ {item.sanctioned_amount}</Text>
            </View>
            <View>
              <Text style={Styles.placeText}>Estimated</Text>
              <Text style={Styles.price}>₹ {item.estimated_amount}</Text>
            </View>
          </View>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.placeText}>Status</Text>
              <Text style={Styles.price}>{item.status}</Text>
            </View>
          </View>
          <View style={Styles.tripInfo}>
            <View style={Styles.rowSpaceAlignment}>
              <View style={Styles.tripPlaces}>
                <Icon name='circle-o' type="FontAwesome" style={Styles.tripIcon} />
                <Text style={Styles.placeText}>Foundation</Text>
              </View>
              <View style={Styles.tripPlaces}>
                <Icon name='calendar-clock' type="MaterialCommunityIcons" style={Styles.checkIcon} />
                <Text style={Styles.placeText}>{item.foundation_date || 'NA'}</Text>
              </View>
            </View>
            <Text style={Styles.lineTracker}>|</Text>
            <View style={Styles.rowSpaceAlignment}>
              <View style={Styles.tripPlaces}>
                <Icon name='circle-o' type="FontAwesome" style={Styles.tripIcon} />
                <Text style={Styles.placeText}>Inauguration</Text>
              </View>
              <View style={Styles.tripPlaces}>
                <Icon name='calendar-clock' type="MaterialCommunityIcons" style={Styles.checkIcon} />
                <Text style={Styles.placeText}>{item.inaugration_date || 'NA'}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.more}>
            <Text style={Styles.postedOn}>Posted on: {item.posted}</Text>
            <TouchableOpacity style={Styles.editBtn} onPress={() => {
              NavigationService.navigate("PublicShipmentDetail")
            }}>
              <Text style={Styles.editText}>READ MORE</Text>
            </TouchableOpacity>
          </View>
        </View>

      </TouchableOpacity>
    )
  }

  render() {
    const { beneficiaryList } = this.props;
    console.log(beneficiaryList);
    return (
      <View style={Styles.layoutDefault}>
        <HeaderComponent title={'Beneficiary Schemes'} {...this.props} />
        <FlatList
          contentContainerStyle={Styles.listContent}
          data={beneficiaryList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.user,
    beneficiaryList: state.beneficiary.beneficiaryList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBeneficiarySchemesList: (accessToken) => dispatch(BeneficiaryActions.beneficiaryRequest(accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedScreen)