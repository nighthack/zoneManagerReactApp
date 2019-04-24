import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'

import RegisterScreen from '../Containers/Register'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import SplashScreen from '../Components/SplashScreen';
import ForgotPasswordScreen from '../Containers/ForgotPassword'
import AuthenticatedScreen from '../Containers/AuthenticatedScreen'
import DrawerComponent from '../Containers/SideMenu';
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
  });

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    RegisterScreen: {
      screen: RegisterScreen
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'ForgotPassword'
  }
);


const AppNavigator = createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);
const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

export default createAppContainer(InitialNavigator);


// export default createAppContainer(AppNavigator);