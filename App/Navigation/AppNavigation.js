import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'

import RegisterScreen from '../Containers/Register'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'

import AuthenticatedScreen from '../Containers/AuthenticatedScreen'
import DrawerComponent from '../Components/DrawerLayout';
import { View, Text, Image, Button } from 'react-native'
import React, { Component } from 'react'
import { Images, Metrics } from '../Themes/'

import styles from './Styles/NavigationStyles'

// // Manifest of possible screens
// const PrimaryNav = createStackNavigator({
//   LoginContainer: { screen: LoginContainer },
//   LaunchScreen: { screen: LaunchScreen },
//   Home: { screen: AuthenticatedScreen},
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LoginContainer',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// })

// export default createAppContainer(PrimaryNav)

class SunilImage extends React.Component {
  render() {
    return (
      <Image
        source={Images.sunil}
        style={styles.MLAImage}
      />
    );
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AuthenticatedScreen,
  },
  Notifications: {
    screen: LaunchScreen,
  },
},
  {
    contentComponent: DrawerComponent
  });

const AppStack = createStackNavigator({
  DrawerStack: { screen: MyDrawerNavigator }
},
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      drawerIcon: () => <Image style={styles.MLAImage} source={Images.hamburger} />,
      headerStyle: {
        backgroundColor: '#f4511e',
        padding: Metrics.baseMargin,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (<Image onPress={() => navigation.navigate('DrawerOpen')} style={styles.MLAImage} source={Images.hamburger} />),
      headerRight: (
        <SunilImage />
      ),
    },
    navigationOptions: {
      drawerIcon: () => <Image style={styles.MLAImage} source={Images.hamburger} />,
    }
  });

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    RegisterScreen: {
      screen: RegisterScreen
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'RegisterScreen'
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));
