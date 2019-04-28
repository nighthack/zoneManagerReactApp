import React, { Component } from "react";
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import { connect } from "react-redux";
import { format } from 'date-fns';
import HeaderComponent from "../Components/HeaderComponent";
import DevelopmentWorksActions from "../Redux/DevelopmentWorkRedux";
import LoadingOverlay from '../Components/LoadingOverlay';
import { Images } from '../Themes/'
// Styles
import Styles from './Styles/BenefeciaryDetailViewStyle'

class DevelopmentWorksList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.pageNo = 1;
    this.state = {

    };
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
    const { user } = this.props;
    this.props.getDevelopmentWorkslist(user.access_token, pageNo);
    this.renderRow = this.renderRow.bind(this);
  }

  goToDetailView(selectedData) {
    const { navigate } = this.props.navigation;
    navigate("DevelopmentWorkDetail", { selectedData });
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
  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.infoLabel}>ಕೆಲಸ/Work</Text>
              <Text style={Styles.truckTrip}>{item.name}</Text>
              <Text style={Styles.infoLabel}>ವಿವರಗಳು/Details</Text>
              <Text style={Styles.truckTrip}>{item.desc}</Text>
            </View>
          </View>
          <View style={Styles.tripInfo}>
                          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <Text style={Styles.infoLabel}>ಇಲಾಖೆ/Department</Text>
                <Text style={Styles.truckData}>{item.department}</Text>
              </View>
            <View style={[Styles.rowSpaceAlignment, { marginTop: 10}]}>
              <View style={Styles.tripPlaces}>
                <Icon
                  name="circle-o"
                  type="FontAwesome"
                  style={Styles.tripIcon}
                />
                <Text style={Styles.placeText}>ಮಂಜೂರಾದ ಮೊತ್ತ / Sanctioned</Text>
              </View>
              <View style={Styles.tripPlaces}>
                <Icon
                  name="cash-multiple"
                  type="MaterialCommunityIcons"
                  style={Styles.checkIcon}
                />
                <Text style={Styles.placeText}>₹ {item.sanctioned_amount}</Text>
              </View>
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
                <Text style={Styles.placeText}>ಅಡಿಗಲ್ಲು ದಿನಾಂಕ / Foundation date</Text>
              </View>
              <View style={[Styles.tripPlaces, { flex: 2 }]}>
                <Icon
                  name="calendar-clock"
                  type="MaterialCommunityIcons"
                  style={Styles.checkIcon}
                />
                <Text style={Styles.placeText}>{item.foundation_date || 'NA'}</Text>
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
                <Text style={Styles.placeText}>ಉದ್ಘಾಟನೆ ದಿನಾಂಕ/Inauguration Date</Text>
              </View>
              <View style={[Styles.tripPlaces, { flex: 2 }]}>
                <Icon
                  name="calendar-clock"
                  type="MaterialCommunityIcons"
                  style={Styles.checkIcon}
                />
                <Text style={Styles.placeText}>{item.inaugration_date || 'NA'}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.more}>
            <Text style={Styles.postedOn}>Last Updated at: {item.updated_at ? format(new Date(item.updated_at), 'DD MMM YYYY') : 'NA'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { data, fetching } = this.props;
    return (
        <Container>
        <HeaderComponent title={''} {...this.props} />
        <Content contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}>
          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='package' type="MaterialCommunityIcons" style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>Development Works</Text>

                <Text style={Styles.hTopDesc}>View all the development works</Text>
              </View>
            </View>
            <FlatList
              contentContainerStyle={Styles.listContent}
              keyExtractor={item => item.id.toString()}
              data={data}
              removeClippedSubview
              renderItem={this.renderRow}
              onEndReached={this.getMoreItems}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
    data: state.development.listData,
    fetching: state.development.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDevelopmentWorkslist: (accessToken, pageNo) =>
      dispatch(DevelopmentWorksActions.developmentWorkRequest(accessToken, pageNo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevelopmentWorksList);
