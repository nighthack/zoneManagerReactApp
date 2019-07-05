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

  componentDidMount() {
    this.props.getPositionsList();
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
    });
  }

  handleNextClick = () => {
    this.dismissKeyboard();
    const isFormValid = this.validateForm();
    if (isFormValid) {
      const { formObj } = this.state;
      this.props.getOTPForNumber(formObj['user[phone]']);
    } else {
      this.props.errorToast('ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ');
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
    const requiredFields = ['user[first_name]', 'user[last_name]', 'user[phone]', 'user[password]', 'user[password_confirmation]', 'user[gender]', 'user[place_id]', 'user[position_id]'];
    requiredFields.map((key) => {
      if (formObj[key]) {
        if (key === 'user[last_name]' || key === 'user[first_name]') {
          const regex = /^[a-zA-Z ]*$/;
          if (!regex.test(formObj[key])) {
            errors += 1;
            errorsObj[key] = "ಹೆಸರಿಗೆ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ವಿಶೇಷ ಅಕ್ಷರಗಳು ಇರಬಾರದು";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[email]') {
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
          if (!regex.test(formObj[key])) {
            errors += 1;
            errorsObj[key] = "ಇಮೇಲ್ ಮಾನ್ಯವಾಗಿಲ್ಲ";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[phone]') {
          const regex = /^[6-9]\d{9}$/; //eslint-disable-line
          if (!regex.test(formObj[key])) {
            errors += 1;
            errorsObj[key] = "ಫೋನ್ ಸಂಖ್ಯೆ ಮಾನ್ಯವಾಗಿಲ್ಲ";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[password]') {
          const regexp = /^\S*$/;
          if ((!regexp.test(formObj[key]) || formObj[key].length < 6)) {
            errors += 1;
            errorsObj[key] = "ಪಾಸ್ವರ್ಡ್ ಉದ್ದವು 6 ಕ್ಕಿಂತ ಹೆಚ್ಚಿರಬೇಕು";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[password_confirmation]') {
          if (formObj[key] !== formObj['user[password]']) {
            errors += 1;
            errorsObj[key] = "ದೃಢೀಕರಣ ಪಾಸ್ವರ್ಡ್ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ";
          } else {
            errorsObj[key] = null;
          }
        } else if (key === 'user[position_id]') {
          if (formObj[key]) {
            errors += 1;
            errorsObj[key] = "ಉದ್ಯೋಗ/ಹುದ್ದೆ ಆಯ್ಕೆ ಮಾಡಿ";
          } else {
            errorsObj[key] = null;
          }
        } else {
          errorsObj[key] = null;
        }
      } else {
        errors += 1;
        errorsObj[key] = `ದಯವಿಟ್ಟು ${key.replace("user[", "").slice(0, -1)} ಭರ್ತಿ ಮಾಡಿ`;
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
            <Text style={Styles.fBtnText}>ಮುಂದೆ</Text>
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
            <Text style={Styles.fBtnText}>ನೋಂದಣಿ</Text>
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
            <Text style={Styles.fBtnText}>ಒಟಿಪಿಯನ್ನು ಮರುಹೊಂದಿಸಿ</Text>
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
            <Text style={Styles.fBtnText}>ಮುಂದೆ</Text>
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
      options = [{ name: 'ಗಂಡು', value: 'ಗಂಡು' }, { name: 'ಹೆಣ್ಣು ', value: 'ಹೆಣ್ಣು' }, { name: 'ಇತರೆ', value: 'ಇತರೆ' }]
    } else {
      options = [{ name: 'ಲಿಂಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ', value: null }, { name: 'ಗಂಡು', value: 'ಗಂಡು' }, { name: 'ಹೆಣ್ಣು', value: 'ಹೆಣ್ಣು' }, { name: 'ಇತರೆ', value: 'ಇತರೆ' }]
    }
    return options.map(({ value, name }, index) => <Picker.Item key={`gender_${index}`} label={name} value={value} />)
  }
  renderPostionOptions() {
    const { OS } = Platform;
    const { positions } = this.props;
    let options = positions.map(({ name, id }) => ({name, value:id }));
    if (OS !== 'ios') {
      options.unshift({ name: 'ಉದ್ಯೋಗ/ಹುದ್ದೆ ಆಯ್ಕೆ ಮಾಡಿ', value: null });
    }
    return options.map(({ value, name }, index) => <Picker.Item key={`position_${index}`} label={name} value={value} />)
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
              <Text style={Styles.logo}>ನೋಂದಣಿ</Text></View>
            <View style={Styles.navRight} />
          </View>
        </Header>

        <Content contentContainerStyle={Styles.layoutDefault}>

          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Image source={Images.sunil} style={[Styles.hImg]} />
              <Text style={Styles.hTopText}>ಸೈನ್ ಅಪ್!</Text>
              <Text style={Styles.hTopDesc}>ಹೊಸ ಖಾತೆಯನ್ನು ತೆರೆ</Text>
            </View>
            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={(errorsObj && errorsObj['user[first_name]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='account' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='ಮೊದಲ ಹೆಸರು'
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
                    placeholder='ಕೊನೆಯ ಹೆಸರು'
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
                    placeholder='ಇಮೇಲ್'
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
                    placeholder='ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'
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
                    placeHolderText="ಹುಟ್ಟಿದ ದಿನಾಂಕ"
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
                      placeholder={'ಲಿಂಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ'}
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
                <View style={[Styles.fSelect, ((errorsObj && errorsObj['user[position_id]']) || error) ? Styles.errorField : {} ]}>
                  <Icon name='account-card-details' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <View style={Styles.fPicker}>
                    <Picker
                      style={Styles.fPickerItem}
                      disabled={fetching}
                      textStyle={Styles.fInput}
                      placeholder={'ಉದ್ಯೋಗ/ಹುದ್ದೆ ಆಯ್ಕೆ ಮಾಡಿ'}
                      placeholderStyle={{ color: 'rgba(36,42,56,0.4)', fontSize: 12 }}
                      selectedValue={formObj['user[position_id]']}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onFormChange(itemValue, 'user[position_id]')
                      }
                    >
                    {this.renderPostionOptions()}
                    </Picker>
                  </View>
                  <Text style={Styles.fErrorLabel}>{errorsObj['user[position_id]']}</Text>
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
                      placeholder="ಸ್ಥಳ ಆರಿಸಿ"
                      resetValue={false}
                      underlineColorAndroid="transparent"
                    />
                </View>
                <View style={(errorsObj && errorsObj['user[password]']) || error ? Styles.fRowError : Styles.fRow }>
                  <Icon name='key' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <TextInput
                    style={Styles.fInput}
                    placeholder='ಪಾಸ್ವರ್ಡ್'
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
                    placeholder='ಪಾಸ್ವರ್ಡ್ ದೃಢೀಕರಣ'
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
                        placeholder='ಒ ಟಿ ಪಿ'
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
                      <Text style={Styles.accountBtnText}>ಒಟಿಪಿಯನ್ನು ಮರುಹೊಂದಿಸಿ</Text>
                    </TouchableOpacity>
                  </View> : null
                }

                {this.renderFormSubmitButton()}
              </View>
            </View>
            <View style={Styles.account}>
              <Text style={Styles.accountText}>ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರ?</Text>
              <TouchableOpacity style={Styles.accountBtn} onPress={() => this.goToPage('Login')}>
                <Text style={Styles.accountBtnText}>ಸೈನ್ ಇನ್</Text>
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
    positions: state.login.positionsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOTPForNumber: (phone) => dispatch(LoginActions.otpRequest(phone, true)),
    errorToast: (msg) => dispatch(ToastActionsCreators.displayError(msg)),
    attempSingUp: (data) => dispatch(LoginActions.signupRequest(data)),
    onNavigationResetState: () => dispatch(LoginActions.logoutRequest()),
    getPositionsList: () => dispatch(LoginActions.getPositionsList()),
    getPlantsForSearchParam: (searchParam) =>
      dispatch(LoginActions.getPreLoginPlacesList(searchParam)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

