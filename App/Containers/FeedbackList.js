import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import HeaderComponent from "../Components/HeaderComponent";
import LoadingOverlay from '../Components/LoadingOverlay';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import FeedbackActions from '../Redux/FeedbackRedux';

// Styles
import Styles from './Styles/FeedbackListStyle'

class FeedbackList extends Component {

	constructor(props) {
    super(props);
		this.pageNo = 1;
		this.state = {
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
		this.props.getFeedbackList(access_token, pageNo);

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
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getFeedbackList: (accessToken, pageNo) =>
			dispatch(FeedbackActions.feedbackRequest(accessToken, pageNo))
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