import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginContainer'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})
