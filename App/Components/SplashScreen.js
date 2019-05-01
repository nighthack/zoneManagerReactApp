import React from 'react';
import { Image, View } from 'react-native';
import { Images, Metrics } from '../Themes/'

const styles = {
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  imageContainer: {
    bottom: 0,
    flex: 1,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
};


class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        1000
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
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          source={Images.splashBackground}
          style={styles.image}
        />
      </View>

    );
  }
}


export default SplashScreen;