import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'

import RegisterScreen from '../Containers/Register'
import LaunchScreen from '../Containers/LaunchScreen'
// These are the Pre Authentication Screens

import LoginScreen from '../Containers/LoginScreen'
import SplashScreen from '../Components/SplashScreen';
import ForgotPasswordScreen from '../Containers/ForgotPassword'


// These Are the post authencation Screens
import BeneficiaryListingScreen from '../Containers/AuthenticatedScreen'
import BeneficiaryDetailScreen from '../Containers/BenefeciaryDetailView'

// These Are the post authencation Screens
import DevelopmentWorksList from '../Containers/DevelopmentWorksList'
import DevelopmentWorkDetail from '../Containers/DevelopmentWorkDetail'

import DrawerComponent from '../Containers/SideMenu';
import { View, Text, Image, Button } from 'react-native'
import React, { Component } from 'react'
import { Images, Metrics } from '../Themes/'

import styles from './Styles/NavigationStyles'

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: BeneficiaryListingScreen,
  },
  BenfeciaryDetail: {
    screen: BeneficiaryDetailScreen,
  },
  DevelopmentWorksList: {
    screen : DevelopmentWorksList
  },
  DevelopmentWorkDetail: {
    screen : DevelopmentWorkDetail
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
    initialRouteName: 'Login'
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