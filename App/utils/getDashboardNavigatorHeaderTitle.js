export default function getDashboardNavigatorHeaderTitle(navigation) {
  const { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle
  if (routeName === 'Home') {
    headerTitle = 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'
  } else {
    headerTitle = routeName
  }
  return headerTitle
}
