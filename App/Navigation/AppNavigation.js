import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'

import RegisterScreen from '../Containers/Register'
import LaunchScreen from '../Containers/LaunchScreen'
// These are the Pre Authentication Screens

import LoginScreen from '../Containers/LoginScreen'
import SplashScreen from '../Components/SplashScreen';
import ForgotPasswordScreen from '../Containers/ForgotPassword'
import NetworkError from '../Components/NetworkErrorScreen'


// These Are the post authencation Screens
import BeneficiaryListingScreen from '../Containers/BeneficiaryList'
import BeneficiaryDetailScreen from '../Containers/BenefeciaryDetailView'

// These Are the post authencation Screens
import EventsListScreen from '../Containers/EventsList';
import EventDetailScreen from '../Containers/EventDetail';

// FeedBack Screen
import FeedbackScreen from '../Containers/FeedbackScreen';
import FeedbackList from '../Containers/FeedbackList';
import FeedbackDetailScreen from '../Containers/FeedbackDetail';

import UserSettings from '../Containers/UserSettings';

// These Are the post authencation Screens
import DevelopmentWorksList from '../Containers/DevelopmentWorksList'
import DevelopmentWorkDetail from '../Containers/DevelopmentWorkDetail'

import DrawerComponent from '../Containers/SideMenu';

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
  EventsListScreen: {
    screen: EventsListScreen,
  },
  EventDetailScreen: {
    screen: EventDetailScreen,
  },
  FeedbackScreen: {
    screen: FeedbackScreen,
  },
  FeedbackList: {
    screen: FeedbackList,
  },
  FeedbackDetailScreen: {
    screen: FeedbackDetailScreen,
  },
  UserSettings: {
    screen: UserSettings,
  },
  Notifications: {
    screen: LaunchScreen,
  },
},
  {
    contentComponent: DrawerComponent
  });

// const AppStack = createStackNavigator({
//   DrawerStack: { screen: MyDrawerNavigator }
// },
//   {
//     headerMode: 'none',
//   });

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    RegisterScreen: {
      screen: RegisterScreen
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
    NetworkError: {
      screen: NetworkError,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login'
  }
);


const AppNavigator = createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: MyDrawerNavigator,
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