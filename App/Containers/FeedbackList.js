import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import HeaderComponent from "../Components/HeaderComponent";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import FeedbackActions from '../Redux/FeedbackRedux';

// Styles
import Styles from './Styles/FeedbackListStyle'

class FeedbackList extends Component {
	// constructor (props) {
	//   super(props)
	//   this.state = {}
	// }
	componentDidMount() {
		const { user } = this.props;
		this.props.getFeedbackList(user.access_token);
	}
	render() {
		const { data, navigation } = this.props;
		console.log(data);
		return (
			<Container>
				<HeaderComponent title={"Feedback"} {...this.props} />
				<Content contentContainerStyle={Styles.layoutDefault}>
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

						<View style={Styles.msg}>
							<FlatList
								data={data}
								showsHorizontalScrollIndicator={false}
								renderItem={({ item, separators }) => (
									<View>
										<TouchableOpacity style={Styles.msgItem} onPress={() => {
											navigation.navigate("FeedbackDetailScreen", { selectedItem: item })
										}}>
											<View>
												<View>
													<Text style={Styles.msgName}>Title</Text>
													<Text style={Styles.msgContent}>{item.name}</Text>
												</View>
												<View>
													<Text style={Styles.msgName}>Department</Text>
													<Text style={Styles.msgContent}>{item.department}</Text>
												</View>
												<View>
													<Text style={Styles.msgName}>Status</Text>
													<Text style={Styles.msgContent}>{item.status}</Text>
												</View>
												<View>
													<Text style={Styles.msgName}>Action</Text>
													<Text style={Styles.msgContent}>{item.action_taken}</Text>
												</View>
											</View>
										</TouchableOpacity>
									</View>
								)}
							/>
						</View>
					</View>
				</Content>
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
		getFeedbackList: accessToken =>
			dispatch(FeedbackActions.feedbackRequest(accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackList)
