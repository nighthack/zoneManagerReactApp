import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import HeaderComponent from '../Components/HeaderComponent'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'
import LoadingOverlay from '../Components/LoadingOverlay';
import { NavigationEvents } from 'react-navigation';
import { Images } from '../Themes/'
import Styles from './Styles/BenefeciaryDetailViewStyle'

class BeneficiaryList extends Component {
  static navigationOptions = {
    headerTitle: 'Beneficiary Schemes',
  };
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.pageNo = 1;
    this.state= {

    }
  }
  componentWillReceiveProps(nextProps) {
		const { data } = nextProps;
		const { canModifyPageNo } = this.state;
		if (data && this.props.data && data.legnth === this.props.data.legnth && canModifyPageNo) {
			this.pageNo -= 1;
			this.setState({
				canModifyPageNo: false,
			});
		}
	}
  componentDidMount() {
    this.onTableFetchRequest(1);
  }

  onTableFetchRequest = (pageNo) => {
    const { access_token } = this.props.user;
    this.props.getBeneficiarySchemesList(access_token, pageNo);
    this.renderRow = this.renderRow.bind(this);
  }

  getMoreItems = () => {
    if(!this.props.fetching) {
			this.pageNo += 1;
			this.onTableFetchRequest(this.pageNo);
			this.setState({
				canModifyPageNo: true,
			});
		}
  }

  goToBeneficiaryDetailView(selectedScheme) {
    const { navigate } = this.props.navigation;
    navigate('BenfeciaryDetail', { selectedScheme });
  }

  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToBeneficiaryDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.infoLabel}>
ಹೆಸರು/Name</Text>
              <Text style={Styles.truckData}>{item.beneficiary_name}</Text>
              <View>
                <View>
                  <Text style={Styles.infoLabel}>ಸ್ಥಳ/Place</Text>
                </View>
                <View style={Styles.tripPlaces}>
                  <Icon name='map-marker' type="FontAwesome" style={Styles.tripIcon} />
                  <Text style={Styles.placeText}>{item.place}</Text>
                </View>
                <View>
                  <Text style={Styles.infoLabel}> ಹಾಲಿ ಸ್ಥಿತಿ/Status </Text>
                  <Text style={Styles.truckData}>{item.status}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.tripInfo}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginVertical: 5 }}>
              <Text style={Styles.infoLabel}>ಯೋಜನೆ/Scheme</Text>
              <Text style={Styles.truckData}>{item.scheme_type}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginVertical: 5 }}>
              <Text style={Styles.infoLabel}>ಮಂಜುರಿ ವಿವರ/Granted Relief</Text>
              <Text style={Styles.truckData}>{item.granted_relief}</Text>
            </View>

          </View>
          <View style={Styles.more}>
            <Text style={Styles.postedOn}>Applied on: {item.application_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { beneficiaryList, fetching } = this.props;
    return (
      <Container>
        <HeaderComponent title={''} {...this.props} />
        <Content contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}>
          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='package' type="MaterialCommunityIcons" style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>Beneficiary Schemes</Text>
                <Text style={Styles.hTopDesc}>View all the beneficiary schemes</Text>
              </View>
            </View>
            <FlatList
              contentContainerStyle={Styles.listContent}
              keyExtractor={item => item.id.toString()}
              data={beneficiaryList}
              renderItem={this.renderRow}
              onEndReached={this.getMoreItems}
              removeClippedSubview
            />

          </View>
        </Content>
        <LoadingOverlay
          visible={fetching}
        >
          <View>
            <Image
              source={Images.bjpGif}
            />
          </View>
        </LoadingOverlay>
      </Container>


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
    getBeneficiarySchemesList: (accessToken, pageNo) => dispatch(BeneficiaryActions.beneficiaryRequest(accessToken, pageNo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryList)




// <View style={Styles.layoutDefault}>
//   <NavigationEvents
//     onWillFocus={payload => console.log('will focus',payload)}
//     onDidFocus={payload => console.log('did focus',payload)}
//     onWillBlur={payload => console.log('will blur',payload)}
//     onDidBlur={payload => console.log('did blur',payload)}
//   />
//   <HeaderComponent title={'Beneficiary List'} {...this.props} />
//   <FlatList
//     contentContainerStyle={Styles.listContent}
//     data={beneficiaryList}
//     renderItem={this.renderRow}
//     keyExtractor={this.keyExtractor}
//     initialNumToRender={this.oneScreensWorth}
//     ListEmptyComponent={this.renderEmpty}
//     onEndReached={this.getMoreItems}
//   />
//   <LoadingOverlay
//     visible={fetching}
//   >
//   <View>
//       <Image
//         source={Images.bjpGif}
//         />
//     </View>
//   </LoadingOverlay>

// </View>


// <View style={Styles.search}>
//     <TextInput style={Styles.searchInput} placeholder='' placeholderTextColor='rgba(255,255,255,0.5)' />
//     <Icon name='search' type="FontAwesome" style={Styles.searchIcon} />
// </View>
