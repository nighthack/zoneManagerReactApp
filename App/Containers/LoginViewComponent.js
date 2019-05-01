import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox, Picker } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import Styles from './Styles/LoginViewComponentStyle'

class LoginViewComponent extends Component {
	// constructor (props) {
	//   super(props)
	//   this.state = {}
	// }

	render() {
		const { navigation } = this.props;
		return (
			<Container>
				<Header style={Styles.navigation}>
					<StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
				</Header>
				<Content contentContainerStyle={Styles.layoutDefault}>
					<Image source={Images.background} style={Styles.bgImg} />
					<View style={Styles.bgLayout}>
						<View style={Styles.hTop}>
							<Image source={Images.sunil} style={Styles.hImg} />
							<Text style={Styles.hTopText}>Login</Text>
							<Text style={Styles.hTopDesc}>Login to your account</Text>
						</View>
						<View style={Styles.regForm}>
							<View style={Styles.infoBox}>
								<View style={Styles.fRow}>
									<Icon name='account' type="MaterialCommunityIcons" style={Styles.fIcon} />
									<TextInput
										style={Styles.fInput} 
										placeholder='Mobile Number' 
										placeholderTextColor='rgba(36,42,56,0.4)' 
									/>
								</View>
								<View style={Styles.fRow}>
									<Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
									<TextInput 
										style={Styles.fInput} 
										placeholder='Password' 
										placeholderTextColor='rgba(36,42,56,0.4)' 
									/>
								</View>
								<View>
									<TouchableOpacity style={Styles.accountBtn} onPress={() => {
										navigation.navigate("PublicForgotPassword")
									}}>
										<Text style={Styles.forgotPassword}>Forgot your password?</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity style={Styles.fBtn} onPress={() => {
									navigation.navigate("PublicDashboard")
								}}>
									<Text style={Styles.fBtnText}>Sign in</Text>
									<Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
								</TouchableOpacity>
							</View>
						</View>

						<View style={Styles.account}>
							<Text style={Styles.accountText}>Don't you have an account?</Text>
							<TouchableOpacity style={Styles.accountBtn} onPress={() => {
								navigation.navigate("PublicRegister")
							}}>
								<Text style={Styles.accountBtnText}>Sign up now!</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Content>

			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewComponent)
