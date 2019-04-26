import React from 'react';
import { Image, TouchableHighlight, ImageBackground } from 'react-native';
import { Images, Metrics } from '../Themes/'

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
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
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5821f'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  profileImgContainer: {
    marginLeft: 10,
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
}

export default SplashScreen;