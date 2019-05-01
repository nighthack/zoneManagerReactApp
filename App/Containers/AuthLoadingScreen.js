import React, { Component } from 'react'
import { AsyncStorage, View, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import LoadingOverlay from '../Components/LoadingOverlay';
import { Images } from '../Themes/'

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem('accessToken').then((userToken) => {
      props.navigation.navigate(userToken ? 'App' : 'Auth');
    })
  }
  render() {
    return (
      <View>
        <ImageBackground
          source={Images.splashBackground}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
        <LoadingOverlay
          visible
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToken: (user) => dispatch(LoginActions.loginSuccess(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
