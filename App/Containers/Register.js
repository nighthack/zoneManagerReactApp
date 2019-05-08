import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid, Keyboard } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Card, Left, Right, Body, Input, Footer, View, FooterTab, Badge, CheckBox, Picker, DatePicker } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import { ToastActionsCreators } from 'react-native-redux-toast';
import LoadingOverlay from '../Components/LoadingOverlay';
import SearchableDropdown from 'react-native-searchable-dropdown';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'
// Styles
import Styles from './Styles/RegisterStyle'

class Register extends Component {
  constructor(props) {
    super(props);
    const phone = props.navigation.getParam('phone', null);
    this.state = {
      formObj: {
        'user[phone]': phone,
      },
      errorsObj: {},
      isErrorShown: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    const { isErrorShown } = this.state;
    if (error && !isErrorShown) {
      const errorKeys = Object.keys(error);
      errorKeys.map((errorKey) => {
        const errorMsgs = error[errorKey];
        errorMsgs.map((errorMsg) => {
          this.props.errorToast(`${errorKey} ${errorMsg}`);
        });
      });
      this.setState({
        isErrorShown: true,
      });
    }
  };

  onFormChange = (value, key) => {
    const { formObj } = this.state;
    this.setState({
      formObj: { ...formObj, [key]: value }
    })
  }
  handleNextClick = () => {
    this.dismissKeyboard();
    const isFormValid = this.validateForm();
    if (isFormValid) {
      const { formObj } = this.state;
      this.props.getOTPForNumber(formObj['user[phone]']);
    } else {
      this.props.errorToast('Please Fill all the mandatory fields');
    }
  }

  goToPage = (route) => {
    const { navigation } = this.props;
    navigation.navigate(route);
    this.props.onNavigationResetState();
    this.setState({
      formObj: {},
      errorsObj: {},
      showPassword: false,
      showPasswordConfirmation: false,
      isErrorShown: false,

    });
  }

  onPlantSearch = text => {
    const { fetchingPlaces } = this.props;
    if (!fetchingPlaces) {
      this.props.getPlantsForSearchParam(text);
    }
  }

  togglePasswordShow = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });

  }
  toggleConfirmationPasswordShow = () => {
    const { showPasswordConfirmation } = this.state;
    this.setState({
      showPasswordConfirmation: !showPasswordConfirmation,
    });

  }
  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  validateForm = () => {
    const { formObj } = this.state;
    const errorsObj = {};
    let errors = 0;
    const requiredFields = ['user[first_name]', 'user[last_name]', 'user[phone]', 'user[password]', 'user[password_confirmation]', 'user[gender]', 'user[place_id]'];
    requiredFields.map((key) => {
      if (formObj[key]) {
        if (key === 'user[last_name]' || key === 'user[first_name]') {
          const regex = /^[a-zA-Z ]*$/;
          if (!regex.test(formObj[key])) {
            errors += 1;
            errorsObj[key] = "Name can't have numbers and special characters";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[email]') {
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
          if (!regex.test(formObj[key])) {
            errors += 1;
            errorsObj[key] = "Email ID isn't Valid";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[phone]') {
          const regex = /^[6-9]\d{9}$/; //eslint-disable-line
          if (!regex.test(formObj[key])) {
            errors += 1;
            errorsObj[key] = "Phone Number isn't Valid";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[password]') {
          const regexp = /^\S*$/;
          if ((!regexp.test(formObj[key]) || formObj[key].length < 6)) {
            errors += 1;
            errorsObj[key] = "Password length has to be more than 6";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[password_confirmation]') {
          if (formObj[key] !== formObj['user[password]']) {
            errors += 1;
            errorsObj[key] = "Confirmation Password Doesn't match";
          } else {
            errorsObj[key] = null;
          }
        } else {
          errorsObj[key] = null;
        }
      } else {
        errors += 1;
        errorsObj[key] = `Please Fill ${key.replace("user[", "").slice(0, -1)}`;
      }
      return key;
    });
    this.setState({
      errorsObj,
    });
    if (errors) {
      return false;
    }
    return true;
  }


  onFormSubmit = () => {
    const isFormValid = this.validateForm();
    if (isFormValid) {
      const { formObj } = this.state;
      if (formObj.otp && formObj.otp.length === 4) {
        let data = new FormData();
        for (let property in formObj) {
          if (property === 'user[first_name]') {
            const firstName = formObj[property];
            const lastName = formObj['user[last_name]'];
            data.append('user[name]', `${firstName} ${lastName}`);
          }
          if (property === 'user[dob]') {
            const date = ("0" + formObj[property].getDate()).slice(-2);
            const month = ("0" + (formObj[property].getMonth() + 1)).slice(-2);
            const year = formObj[property].getFullYear();
            data.append(property, `${year}-${month}-${date}`);
          } else if (property === 'user[place_id]') {
            data.append(property, formObj[property].id);
          } else if (property !== 'user[last_name]') {
            data.append(property, formObj[property]);
          }
        }
        this.props.attempSingUp(data);
        this.setState({
          isErrorShown: false,
        });
      } else {
        this.props.errorToast("OTP Can't be blank");
      }

    }
  };

  renderFormSubmitButton() {
    const { otpStatus, fetching } = this.props;
    switch (otpStatus) {
      case 0:
        {
          return (
            <TouchableOpacity
            style={Styles.fBtn}
            onPress={this.handleNextClick}
            disabled={fetching}
          >
            <Text style={Styles.fBtnText}>Next</Text>
            <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
          </TouchableOpacity>
          )
        }
      case 1:
        {
          return (
            <TouchableOpacity
            style={Styles.fBtn}
            onPress={this.onFormSubmit}
            disabled={fetching}
          >
            <Text style={Styles.fBtnText}>Register</Text>
            <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
          </TouchableOpacity>
          )
        }
      case 2:
        {
          return (
            <TouchableOpacity
            style={Styles.fBtn}
            onPress={this.handleNextClick}
            disabled={fetching}
          >
            <Text style={Styles.fBtnText}>Resend OTP</Text>
            <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
          </TouchableOpacity>
          )
        }
      default:
        {
          return (
            <TouchableOpacity
            style={Styles.fBtn}
            onPress={this.handleNextClick}
            disabled={fetching}
          >
            <Text style={Styles.fBtnText}>Next</Text>
            <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
          </TouchableOpacity>
          )
        }
    }
  }
  renderPickerOptions() {
    const { OS } = Platform;
    let options = [];
    if (OS === 'ios') {
      options = [{ name: 'Male-ಗಂಡು', value: 'male' }, { name: 'Female-ಹೆಣ್ಣು ', value: 'female' }, { name: 'Other- ಇತರೆ', value: 'others' }]
    } else {
      options = [{ name: 'ಲಿಂಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ/ Select Gender', value: null }, { name: 'Male-ಗಂಡು', value: 'male' }, { name: 'Female-ಹೆಣ್ಣು ', value: 'female' }, { name: 'Other- ಇತರೆ', value: 'others' }]
    }
    return options.map(({ value, name }, index) => <Picker.Item key={`gender_${index}`} label={name} value={value} />)
  }
  render() {
    const { navigate } = this.props.navigation;
    const { otpStatus, fetching, error, placesList } = this.props;
    const { formObj, errorsObj, showPassword, showPasswordConfirmation } = this.state;
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => this.goToPage('Login')}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle} >
              <Text style={Styles.logo}>Register</Text></View>
            <View style={Styles.navRight} />
          </View>
        </Header>

        <Content contentContainerStyle={Styles.layoutDefault}>

          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Image source={Images.sunil} style={[Styles.hImg]} />
              <Text style={Styles.hTopText}>Sign Up!</Text>
              <Text style={Styles.hTopDesc}>Create a new account</Text>
            </View>
            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={(errorsObj && errorsObj['user[first_name]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='account' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='First Name/ಮೊದಲ ಹೆಸರು'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    onChangeText={(text) => this.onFormChange(text, 'user[first_name]')}
                    keyboardType={'default'}
                    disabled={fetching}
                    value={formObj['user[first_name]']}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[first_name]']}</Text>
                </View>

                <View style={(errorsObj && errorsObj['user[last_name]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='account' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Last Name/ಕೊನೆಯ ಹೆಸರು'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    onChangeText={(text) => this.onFormChange(text, 'user[last_name]')}
                    keyboardType={'default'}
                    disabled={fetching}
                    value={formObj['user[last_name]']}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[last_name]']}</Text>
                </View>
                <View style={(errorsObj && errorsObj['user[email]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='email' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Email Address/ಇಮೇಲ್'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.onFormChange(text, 'user[email]')}
                    disabled={fetching}
                    value={formObj['user[email]']}

                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[email]']}</Text>
                </View>
                <View style={(errorsObj && errorsObj['user[phone]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='mobile' type="FontAwesome" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Mobile Number/ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => this.onFormChange(text, 'user[phone]')}
                    disabled={fetching}
                    value={formObj['user[phone]']}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[phone]']}</Text>
                </View>
                <View style={Styles.fRow}>
                  <Icon name='calendar-today' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"spinner"}
                    placeHolderText="Date Of Birth / ಹುಟ್ಟಿದ ದಿನಾಂಕ"
                    textStyle={Styles.fInput}
                    placeHolderTextStyle={{ color: 'rgba(36,42,56,0.4)' }}
                    onDateChange={(date) => this.onFormChange(date, 'user[dob]')}
                    disabled={fetching}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[dob]']}</Text>
                </View>
                <View style={[Styles.fSelect, ((errorsObj && errorsObj['user[gender]']) || error) ? Styles.errorField : {} ]}>
                  <Icon name='account-card-details' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <View style={Styles.fPicker}>
                    <Picker
                      style={Styles.fPickerItem}
                      disabled={fetching}
                      textStyle={Styles.fInput}
                      placeholder={'ಲಿಂಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ/ Select Gender'}
                      placeholderStyle={{ color: 'rgba(36,42,56,0.4)', fontSize: 12 }}
                      selectedValue={formObj['user[gender]']}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onFormChange(itemValue, 'user[gender]')
                      }
                    >
                    {this.renderPickerOptions()}
                    </Picker>
                  </View>
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[gender]']}</Text>
                </View>
                <View style={Styles.fSelect}>
                  <Icon name='map-marker' type="FontAwesome" style={Styles.fIcon} />
                    <SearchableDropdown
                      onTextChange={(text) => this.onPlantSearch(text)}
                      onItemSelect={item => this.onFormChange(item, 'user[place_id]')}
                      textInputStyle={Styles.fSearchInput}
                      containerStyle={Styles.fPicker}
                      itemStyle={Styles.pickerItem}
                      itemTextStyle={Styles.fSearchInput}
                      items={placesList}
                      defaultIndex={0}
                      placeholder="Select Place/ಸ್ಥಳ ಆರಿಸಿ"
                      resetValue={false}
                      underlineColorAndroid="transparent"
                    />
                </View>
                <View style={(errorsObj && errorsObj['user[password]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Password/ಪಾಸ್ವರ್ಡ್'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    keyboardType={'default'}
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => this.onFormChange(text, 'user[password]')}
                    disabled={fetching}
                    value={formObj['user[password]']}

                  />
                  <Icon
                    name={showPassword ? 'eye-off' :'eye'}
                    type="MaterialCommunityIcons"
                    style={Styles.fIcon}
                    onPress={this.togglePasswordShow}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[password]']}</Text>
                </View>
                <View style={(errorsObj && errorsObj['user[password_confirmation]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Confirm Password/ ಪಾಸ್ವರ್ಡ್ ದೃಢೀಕರಣ'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    secureTextEntry={!showPasswordConfirmation}
                    onChangeText={(text) => this.onFormChange(text, 'user[password_confirmation]')}
                    disabled={fetching}
                  />
                  <Icon
                    name={showPasswordConfirmation ? 'eye-off' :'eye'}
                    type="MaterialCommunityIcons"
                    style={Styles.fIcon}
                    onPress={this.toggleConfirmationPasswordShow}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[password_confirmation]']}</Text>
                </View>
                {
                  otpStatus === 1 ?
                    <View style={(errorsObj && errorsObj['user[otp]']) || error ? Styles.fRowError : Styles.fRow }>
                      <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                      <TextInput
                        style={Styles.fInput}
                        placeholder='OTP/ಒ ಟಿ ಪಿ'
                        placeholderTextColor='rgba(36,42,56,0.4)'
                        onChangeText={(text) => this.onFormChange(text, 'otp')}
                        disabled={fetching}
                        keyboardType={'number-pad'}
                      />
                      <Text style={Styles.fErrorLabel}>{errorsObj['otp']}</Text>
                    </View> : null
                }
                {
                  otpStatus ?
                  <View style={Styles.account}>
                    <TouchableOpacity style={Styles.accountBtn} onPress={this.handleNextClick}>
                      <Text style={Styles.accountBtnText}>Resend OTP</Text>
                    </TouchableOpacity>
                  </View> : null
                }

                {this.renderFormSubmitButton()}
              </View>
            </View>
            <View style={Styles.account}>
              <Text style={Styles.accountText}>Already have an account?</Text>
              <TouchableOpacity style={Styles.accountBtn} onPress={() => this.goToPage('Login')}>
                <Text style={Styles.accountBtnText}>Sign in</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Content>
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
    otpStatus: state.login.getOtpStatus,
    fetching: state.login.fetching,
    error: state.login.signUpErrors,
    placesList: state.login.placesList,
    fetchingPlaces: state.login.fetchingPlaces,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOTPForNumber: (phone) => dispatch(LoginActions.otpRequest(phone, true)),
    errorToast: (msg) => dispatch(ToastActionsCreators.displayError(msg)),
    attempSingUp: (data) => dispatch(LoginActions.signupRequest(data)),
    onNavigationResetState: () => dispatch(LoginActions.logoutRequest()),
    getPlantsForSearchParam: (searchParam) =>
      dispatch(LoginActions.getPreLoginPlacesList(searchParam)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)


// <TouchableOpacity style={Styles.fBtn} onPress={this.onFormSubmit}>
//                   <Text style={Styles.fBtnText}>Sign Up!</Text>
//                   <Icon name='arrow-right' type="FontAwesome" style={Styles.fBtnIcon} />
//                 </TouchableOpacity>
