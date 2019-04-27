import React, { Component } from "react";
import { TouchableOpacity, FlatList, Image } from "react-native";
import { Icon, Text, View, Badge } from "native-base";
import { connect } from "react-redux";
import { format } from 'date-fns';
import HeaderComponent from "../Components/HeaderComponent";
import DevelopmentWorksActions from "../Redux/DevelopmentWorkRedux";
import LoadingOverlay from '../Components/LoadingOverlay';
import { Images } from '../Themes/'
// Styles
import Styles from "./Styles/DevelopmentWorksListStyle";

class DevelopmentWorksList extends Component {

  componentDidMount() {
    const { user } = this.props;
    this.props.getDevelopmentWorkslist(user.access_token);
    this.renderRow = this.renderRow.bind(this);
  }
  goToDetailView(selectedData) {
    const { navigate } = this.props.navigation;
    navigate("DevelopmentWorkDetail", { selectedData });
  }
  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToDetailView(item)}>
        <View style={Styles.tripItem}>
          <View style={Styles.truckInfo}>
            <View>
              <Text style={Styles.truckTrip}>{item.name}</Text>
              <Text style={Styles.truckData}>{item.desc}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={Styles.truckData}>Department: {item.department_id}</Text>
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
                <Text style={Styles.placeText}>Estimated Amount</Text>
              </View>
              <View style={Styles.tripPlaces}>
                <Icon
                  name="cash-multiple"
                  type="MaterialCommunityIcons"
                  style={Styles.checkIcon}
                />
                <Text style={Styles.placeText}>₹ {item.estimated_amount}</Text>
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
                <Text style={Styles.placeText}>Sanctioned</Text>
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
                <Text style={Styles.placeText}>Foundation date</Text>
              </View>
              <View style={Styles.tripPlaces}>
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
                <Text style={Styles.placeText}>Inauguration Date</Text>
              </View>
              <View style={Styles.tripPlaces}>
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
      <View style={Styles.layoutDefault}>
        <HeaderComponent title={"Development Works"} {...this.props} />
        <FlatList
          contentContainerStyle={Styles.listContent}
          data={data}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
        <LoadingOverlay
          visible={fetching}
        >
          <View>
            <Image source={Images.bjpGif} />
          </View>
        </LoadingOverlay>
      </View>
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
    getDevelopmentWorkslist: accessToken =>
      dispatch(DevelopmentWorksActions.developmentWorkRequest(accessToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevelopmentWorksList);
