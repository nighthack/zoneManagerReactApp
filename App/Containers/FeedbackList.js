import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import HeaderComponent from "../Components/HeaderComponent";
import LoadingOverlay from '../Components/LoadingOverlay';
import FeedbackActions from '../Redux/FeedbackRedux';

// Styles
import Styles from './Styles/FeedbackListStyle'

class FeedbackList extends Component {
  componentDidMount() {
    this.onTableFetchRequest();
  }

  onTableFetchRequest = (pageNo) => {
  	const { user, lastCalledPage, currentPage } = this.props;
    const { access_token } = user;
    this.props.getFeedbackList(access_token, currentPage, lastCalledPage);
  }

  getMoreItems = () => {
    if (!this.props.fetching) {
      this.onTableFetchRequest(this.pageNo);
    }
  }
  onRefresh = () => {
    this.onTableFetchRequest();
    alert('refreshing');
  }
  render() {
    const { data, navigation, fetching } = this.props;
    return (
      <Container>
				<HeaderComponent title={"Feedback"} {...this.props} />
				<View contentContainerStyle={[Styles.layoutDefault]}>
					<Image source={Images.background} style={Styles.bgImg} />
					<View style={Styles.bgLayout}>
						<View style={Styles.hTop}>
							<Icon name='google-maps' type="MaterialCommunityIcons" style={Styles.hImg} />
							<View style={Styles.hContent}>
								<Text style={Styles.hTopText}>Feedback</Text>
								<Text style={Styles.hTopDesc}>View the Feedback</Text>

							</View>
						</View>
						<View style={[Styles.decisionBox, { paddingHorizontal: 15 }]}>
							<TouchableOpacity style={Styles.acceptBtn} onPress={() => {
								navigation.navigate("FeedbackScreen")
							}}>
								<Text style={Styles.btnText}>Give Feedback</Text>
							</TouchableOpacity>
						</View>

						<FlatList
								data={data}
								refreshing={fetching}
								showsHorizontalScrollIndicator={false}
								removeClippedSubview
								onEndReached={this.getMoreItems}
								onRefresh={this.onRefresh}
                refreshing={fetching}
								renderItem={({ item, separators }) => (
									<View>
										<TouchableOpacity style={Styles.msgItem}>
											<View>
												<View>
													<Text style={Styles.msgName}>ವಿಷಯ/Title</Text>
													<Text style={Styles.msgContent}>{item.name}</Text>
												</View>
												<View>
													<Text style={Styles.msgName}>ಇಲಾಖೆ/Department</Text>
													<Text style={Styles.msgContent}>{item.department}</Text>
												</View>
												<View>
													<Text style={Styles.msgName}>ಹಾಲಿ ಸ್ಥಿತಿ/Status</Text>
													<Text style={Styles.msgContent}>{item.status}</Text>
												</View>
												<View>
													<Text style={Styles.msgName}>ಕ್ರಿಯೆ/Action</Text>
													<Text style={Styles.msgContent}>{item.action_taken}</Text>
												</View>
											</View>
										</TouchableOpacity>
									</View>
								)}
							/>
					</View>
				</View>

			</Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    data: state.feedback.listData,
    fetching: state.feedback.fetching,
    lastCalledPage: state.feedback.lastCalledPage,
    currentPage: state.feedback.currentPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedbackList: (accessToken, pageNo, lastCalledPage) =>
      dispatch(FeedbackActions.feedbackRequest(accessToken, pageNo, lastCalledPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackList)


// onPress={() => {
// 											navigation.navigate("FeedbackDetailScreen", { selectedItem: item })
// 										}}


// <LoadingOverlay
// visible={fetching}
// >
// <View>
// 	<Image source={Images.bjpGif} />
// </View>
// </LoadingOverlay>
