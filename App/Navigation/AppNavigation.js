import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginContainer from '../Containers/LoginContainer'
import LaunchScreen from '../Containers/LaunchScreen'
import AuthenticatedScreen from '../Containers/AuthenticatedScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginContainer: { screen: LoginContainer },
  LaunchScreen: { screen: LaunchScreen },
  Home: { screen: AuthenticatedScreen},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginContainer',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
