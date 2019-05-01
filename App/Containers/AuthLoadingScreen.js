import React, { Component } from 'react'
import { AsyncStorage, View, Image } from 'react-native'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import LoadingOverlay from '../Components/LoadingOverlay';
import { Images } from '../Themes/'


const styles = {
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  imageContainer: {
    bottom: 0,
    flex: 1,
    height: '135%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
};
class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem('accessToken').then((userToken) => {
      props.navigation.navigate(userToken ? 'App' : 'Auth');
    })
  }
  render() {
    return (
      <View style={styles.imageContainer}>
      <Image
        resizeMode="cover"
        source={Images.splashBackground}
        style={styles.image}
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
