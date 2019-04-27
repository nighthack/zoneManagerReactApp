import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Picker, Footer, View, FooterTab, Badge, CheckBox, Textarea } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import LoadingOverlay from '../Components/LoadingOverlay';
import SearchableDropdown from 'react-native-searchable-dropdown';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import FeedbackActions from '../Redux/FeedbackRedux'

// Styles
import Styles from './Styles/FeedbackScreenStyle'

class FeedbackScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			formObj: {},
		}
	}
	onFormChange = (value, key) => {
		const { formObj } = this.state;
		this.setState({
			formObj: { ...formObj, [key]: value }
		});
	}
  onPlantSearch = text => {
    const { user } = this.props;
    this.props.getPlantsForSearchParam(user.access_token, text);
  }
	render() {
		const { fetching, navigation } = this.props;
		const { formObj } = this.state;
		var items = [
			{
				id: 1,
				name: 'JavaScript',
			},
			{
				id: 2,
				name: 'Java',
			},
			{
				id: 3,
				name: 'Ruby',
			},
			{
				id: 4,
				name: 'React Native',
			},
			{
				id: 5,
				name: 'PHP',
			},
			{
				id: 6,
				name: 'Python',
			},
			{
				id: 7,
				name: 'Go',
			},
			{
				id: 8,
				name: 'Swift',
			},
		];
		return (
			<Container>
				<Header style={Styles.navigation}>
					<StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
					<View style={Styles.nav}>
						<View style={Styles.navLeft}>
							<TouchableOpacity style={Styles.navLeft} onPress={() => {
								navigation.navigate("CustomerDashboard")
							}}>
								<Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
							</TouchableOpacity>
						</View>
						<View style={Styles.navMiddle} />
						<View style={Styles.navRight} />
					</View>
				</Header>

				<Content contentContainerStyle={Styles.layoutDefault}>

					<Image source={Images.background} style={Styles.bgImg} />
					<View style={Styles.bgLayout}>
						<View style={Styles.hTop}>
							<Icon name='feedback' type="MaterialIcons" style={Styles.hImg} />
							<View style={Styles.hContent}>
								<Text style={Styles.hTopText}>Feedback</Text>
								<Text style={Styles.hTopDesc}>Your Feedback is very important for us</Text>
							</View>
						</View>
						<View style={Styles.regForm}>
							<View style={Styles.infoBox}>
								<View style={Styles.infoHeader}>
									<Text style={Styles.infoHeaderText}>Feedback Details</Text>
								</View>
								<View style={Styles.fRow}>
									<TextInput
										style={Styles.fInput}
										placeholder='Title'
										placeholderTextColor='rgba(36,42,56,0.4)'
										onChangeText={(text) => this.onFormChange(text, 'feedback[name]')}
									/>
									<Icon
										name='message-text-outline'
										type="MaterialCommunityIcons"
										style={Styles.fIcon}
									/>
								</View>

								<View style={Styles.fDropdown}>
									<SearchableDropdown
                      onTextChange={(text) => this.onPlantSearch(text)}
                      onItemSelect={item => this.onFormChange(item, 'feedback[place_id]')}
                      textInputStyle={Styles.fSearchInput}
                      containerStyle={Styles.fPicker}
                      itemStyle={Styles.pickerItem}
                      itemTextStyle={Styles.fSearchInput}
                      items={items}
                      defaultIndex={0}
                      placeholder="Select Place"
                      resetValue={false}
                      underlineColorAndroid="transparent"
                    />
                    <Icon
                      name='message-text-outline'
                      type="MaterialCommunityIcons"
                      style={Styles.fDropdownIcon}
                    />
								</View>
								<View style={Styles.fSelect}>
									<View style={Styles.fPicker}>
										<Picker
											style={Styles.fPickerItem}
											placeholder="Select Department"
											placeholderStyle={Styles.placeholderStyle}
											onValueChange={(itemValue, itemIndex) =>
												this.onFormChange(itemValue, 'feedback[feedback_type]')
											}
										>
											<Picker.Item label="Tata Ace" value="key0" />
										</Picker>
									</View>
									<Icon name='chevron-down' type="MaterialCommunityIcons" style={Styles.fIcon} />
								</View>
								<View style={Styles.fSelect}>
									<View style={Styles.fPicker}>
										<Picker
											style={Styles.fPickerItem}
											placeholder="Select your Location"
											placeholderStyle={Styles.placeholderStyle}
											onValueChange={(itemValue, itemIndex) =>
												this.onFormChange(itemValue, 'feedback[place_id]')
											}

										>
											<Picker.Item label="Tata Ace" value="key0" />
										</Picker>
									</View>
									<Icon name='chevron-down' type="MaterialCommunityIcons" style={Styles.fIcon} />
								</View>
								<View style={Styles.fRow}>
									<Textarea
										style={Styles.fInput}
										placeholder='Details'
										placeholderTextColor='rgba(36,42,56,0.4)'
										multiline={true}
										numberOfLines={10}
										onChangeText={(text) => this.onFormChange(text, 'feedback[details]')}
									/>
									<Icon
										name='information-outline'
										type="MaterialCommunityIcons"
										style={Styles.fIcon}
									/>
								</View>
							</View>
						</View>

						<TouchableOpacity style={Styles.fBtn} onPress={() => {
							navigation.navigate("CustomerShipment")
						}}>
							<Text style={Styles.fBtnText}>Save</Text>
							<Icon name='check' type="FontAwesome" style={Styles.fBtnIcon} />
						</TouchableOpacity>
					</View>
				</Content>
				<LoadingOverlay
					visible={fetching}
				>
					<View>
						<Image source={Images.bjpGif} />
					</View>
				</LoadingOverlay>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.login.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPlantsForSearchParam: (accessToken, searchParam) =>
			dispatch(FeedbackActions.getPlacesList(accessToken, searchParam))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen)
