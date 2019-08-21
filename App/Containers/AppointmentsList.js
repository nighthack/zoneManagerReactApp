import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, TouchableOpacity, Image, FlatList  } from 'react-native'
import { Container,  Content,  Icon, Text, View } from 'native-base'
import { format } from 'date-fns';
import LoadingOverlay from '../Components/LoadingOverlay';
import FooterComponent from '../Components/ListFooter';
import ErrorPage from '../Components/NetworkErrorScreen';
import AppointmentActions from '../Redux/AppointmentRedux';
import Styles from './Styles/BenefeciaryDetailViewStyle';
import { NavigationEvents } from 'react-navigation';

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
class AppointmentList extends Component {

	onTableFetchRequest = (pageNo) => {
		AsyncStorage.getItem('accessToken').then((accessToken) => {
			this.props.getAppointmentsList(accessToken, pageNo);
		});
	}

	goToPage = (option) => {
		const { currentPage } = this.props;
		if (option === 'next') {
			this.onTableFetchRequest(currentPage + 1);
		} else if (option === 'prev') {
			this.onTableFetchRequest(currentPage - 1 >= 0 ? currentPage - 1 : 1);
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
		const { listError, currentPage, data, fetching, navigation } = this.props;
		if (listError) {
			return <ErrorPage status={listError} onButtonClick={() => this.onTableFetchRequest(1)} />
		}
		return (
			<View style={{ flex: 1 }}>
				<NavigationEvents
					onDidFocus={() => this.goToPage('first')}
				/>
				<Content
					contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}
				>
					<View style={Styles.bgLayout}>
						<View style={[Styles.decisionBox, { paddingHorizontal: 15 }]}>
							<TouchableOpacity style={Styles.acceptBtn} onPress={() => {
								navigation.navigate("CreateAppointmentScreen")
							}}>
								<Text style={Styles.btnText}>Request Appointment</Text>
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
												<Text style={Styles.infoLabel}>ವಿಷಯ</Text>
												<Text style={Styles.truckData}>{item.name}</Text>
												<Text style={Styles.infoLabel}>ಸ್ಥಳ</Text>
												<Text style={Styles.truckData}>{item.place}</Text>
												<View>
													<Text style={Styles.infoLabel}> ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ</Text>
													<Text style={Styles.truckData}>{item.feedback_type}</Text>
												</View>
											</View>
										</View>
										<View style={Styles.tripInfo}>
											<View style={{ flexDirection: "column", alignItems: "flex-start" }}>
												<Text style={Styles.infoLabel}>ಇಲಾಖೆ</Text>
												<Text style={Styles.truckData}>{item.department}</Text>
											</View>
											<View>
												<Text style={Styles.infoLabel}>ಹಾಲಿ ಸ್ಥಿತಿ</Text>
												<Text style={Styles.truckData}>{item.status}</Text>
											</View>
											<View>
												<Text style={Styles.infoLabel}>ಕ್ರಿಯೆ</Text>
												<Text style={Styles.truckData}>{item.action_taken || 'NA'}</Text>
											</View>
										</View>
										<View style={Styles.more}>
											<Text style={Styles.postedOn}>ಕೊನೆಯ ನವೀಕರಿಸಿದ ದಿನಾಂಕ: {item.updated_at ? format(new Date(item.updated_at), 'DD-MM-YYYY') : 'NA'}</Text>
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
					refreshPage={() => this.goToPage('refresh')}
					data={data}
					currentPage={currentPage}
				/>
			</View>

		)
	}

	render() {
    const { fetching } = this.props;
		return (
			<Container>
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
		data: state.appointment.listData,
		fetching: state.appointment.fetching,
		currentPage: state.appointment.lastCalledPage,
		listError: state.appointment.listError,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAppointmentsList: (accessToken, pageNo) =>
			dispatch(AppointmentActions.appointmentOnListRequest(accessToken, pageNo))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList)