import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import { AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, RefreshControl } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox } from 'native-base'
import { format } from 'date-fns';
import HeaderComponent from '../Components/HeaderComponent'
import LoadingOverlay from '../Components/LoadingOverlay';
import FooterComponent from '../Components/ListFooter';
import ErrorPage from '../Components/NetworkErrorScreen';
import FeedbackActions from '../Redux/FeedbackRedux';
import Styles from './Styles/BenefeciaryDetailViewStyle';

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
class FeedbackList extends Component {

	componentDidMount() {
		this.onTableFetchRequest(1);
	}

	onTableFetchRequest = (pageNo) => {
		AsyncStorage.getItem('accessToken').then((accessToken) => {
			this.props.getFeedbackList(accessToken, pageNo);
		});
	}

	goToPage = (option) => {
		const { currentPage } = this.props;
		if (option === 'next') {
			this.onTableFetchRequest(currentPage + 1);
		} else if (option === 'prev') {
			this.onTableFetchRequest(currentPage - 1 >= 0 ? lastCalledPage - 1 : 1);
		} else if (option === 'first') {
			this.onTableFetchRequest(1);
		} else if (option === 'refresh') {
			this.onTableFetchRequest(currentPage);
		}
	}

	goToDetailView(selectedData) {
		const { navigate } = this.props.navigation;
		navigate("FeedbackDetailScreen", { selectedData });
	}

	renderContent = () => {
		const { listError, lastCalledPage, data, fetching, navigation } = this.props;
		if (listError) {
			return <ErrorPage status={listError} onButtonClick={() => this.onTableFetchRequest(1)} />
		}
		return (
			<View style={{ flex: 1 }}>
				<Content
					contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}
				>
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
							style={{ marginBottom: 80 }}
							data={data}
							refreshing={fetching}
							showsHorizontalScrollIndicator={false}
							removeClippedSubview
							keyExtractor={() => randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}
							onEndReached={this.getMoreItems}

							renderItem={({ item, separators }) => (
								<TouchableOpacity onPress={() => this.goToDetailView(item)}>
									<View style={Styles.tripItem}>
										<View style={Styles.truckInfo}>
											<View>
												<Text style={Styles.infoLabel}>ವಿಷಯ/Title</Text>
												<Text style={Styles.truckData}>{item.name}</Text>
												<Text style={Styles.infoLabel}>ಸ್ಥಳ/Place</Text>
												<Text style={Styles.truckData}>{item.place}</Text>
												<View>
													<Text style={Styles.infoLabel}> Type/ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ</Text>
													<Text style={Styles.truckData}>{item.feedback_type}</Text>
												</View>
											</View>
										</View>
										<View style={Styles.tripInfo}>
											<View style={{ flexDirection: "column", alignItems: "flex-start" }}>
												<Text style={Styles.infoLabel}>ಇಲಾಖೆ/Department</Text>
												<Text style={Styles.truckData}>{item.department}</Text>
											</View>
											<View>
												<Text style={Styles.infoLabel}>ಹಾಲಿ ಸ್ಥಿತಿ/Status</Text>
												<Text style={Styles.truckData}>{item.status}</Text>
											</View>
											<View>
												<Text style={Styles.infoLabel}>ಕ್ರಿಯೆ/Action</Text>
												<Text style={Styles.truckData}>{item.action_taken || 'NA'}</Text>
											</View>
										</View>
										<View style={Styles.more}>
											<Text style={Styles.postedOn}>Last Updated at: {item.updated_at ? format(new Date(item.updated_at), 'DD MMM YYYY') : 'NA'}</Text>
										</View>
									</View>
								</TouchableOpacity>

							)}
						/>
					</View>
				</Content>
				<FooterComponent
					goToFirstPage={() => this.goToPage('first')}
					goToNextPage={() => this.goToPage('next')}
					goToPrevPage={() => this.goToPage('prev')}
					refreshPage={()=> this.goToPage('refresh')}
					data={data}
					currentPage={lastCalledPage}
				/>
			</View>

		)
	}

	render() {
		const { fetching } = this.props;
		return (
			<Container>
				<HeaderComponent title={''} {...this.props} />
				{this.renderContent()}
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
		data: state.feedback.listData,
		fetching: state.feedback.fetching,
		currentPage: state.feedback.lastCalledPage,
		listError: state.feedback.listError,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getFeedbackList: (accessToken, pageNo) =>
			dispatch(FeedbackActions.feedbackOnListRequest(accessToken, pageNo))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackList)


// onPress={() => {
// 											navigation.navigate("FeedbackDetailScreen", { selectedItem: item })
// 										}}





// {/* <View>
// 											<Text style={Styles.infoLabel}>ವಿಷಯ/Title</Text>
// 											<Text style={Styles.truckData}>{item.name}</Text>
// 										</View>
// 										<View>
// 											<Text style={Styles.infoLabel}>ಇಲಾಖೆ/Department</Text>
// 											<Text style={Styles.truckData}>{item.department}</Text>
// 										</View>
// 										 */}