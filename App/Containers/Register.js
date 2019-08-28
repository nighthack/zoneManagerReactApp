import React, { Component } from 'react'
import { TouchableOpacity, Keyboard, Modal } from 'react-native'
import { Container, Content, Icon, Text } from 'native-base'
import { connect } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast';
import { CustomActivityIndicator } from '../Components/ui';
import LoginActions from '../Redux/LoginRedux'
import { SignUpForm } from '../Components/forms'
// Styles
import Styles from './Styles/RegisterStyle'

export const onboardingHeaderStyle = {
  backgroundColor: '#f5f5f2',
  borderBottomColor: 'transparent'
}
class Register extends Component {
  static navigationOptions = {
    title: 'ಸೈನ್ ಅಪ್',
    headerStyle: onboardingHeaderStyle,
  }
  constructor(props) {
    super(props);
    const phone = props.navigation.getParam('phone', null);
    this.state = {
      formObj: {
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

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };



  onFormSubmit = (values) => {
    debugger;
    this.props.getOTPForNumber(values.phone);
    this.setState({ formObj: values });
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

  renderPostionOptions() {
    const { positions } = this.props;
    let options = positions.map(({ name, id }) => ({ name, value: id }));
    return options;
  }
  render() {
    const { navigate } = this.props.navigation;
    const { otpStatus, fetching, error, placesList, positions } = this.props;
    const { formObj, errorsObj } = this.state;
    console.log(otpStatus);
    return (
      <Container>
        <Content contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#F1F2F6'
        }}>
          {
            !otpStatus ?
              <SignUpForm
                loading={fetching}
                onSubmit={values => this.onFormSubmit(values)}
                positions={this.renderPostionOptions()}
              /> : null
          }

        </Content>
        {
          fetching ? <CustomActivityIndicator /> : null
        }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

