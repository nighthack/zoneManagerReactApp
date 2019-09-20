import { StackActions, NavigationActions } from 'react-navigation'

export default function resetNavigationStack(navigation) {
  const resetAction = StackActions.reset({
    index: 0,
    key: 'MainStackNavigator',
    actions: [NavigationActions.navigate({ routeName: 'Landing' })]
  })
  navigation.dispatch(resetAction)

  return true
}
