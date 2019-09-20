import * as React from 'react'
import { BackHandler, Platform } from 'react-native'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { withNavigation } from 'react-navigation';

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
)

const ReduxAppNavigator = reduxifyNavigator(AppNavigation, 'root')

class ReduxNavigation extends React.Component {
  componentDidMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress', undefined)
  }

  render () {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps)(ReduxNavigation)
