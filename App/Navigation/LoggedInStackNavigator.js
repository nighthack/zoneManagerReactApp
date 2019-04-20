import { createStackNavigator } from 'react-navigation'
import AuthenticatedScreen from '../Containers/AuthenticatedScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default createStackNavigator({
  AuthenticatedScreen: {
    screen: AuthenticatedScreen
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})
