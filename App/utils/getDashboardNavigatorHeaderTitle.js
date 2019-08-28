export default function getDashboardNavigatorHeaderTitle(navigation) {
  const { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle
  if (routeName === 'Home') {
    headerTitle = 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'
  } else if(routeName === 'Feedback') {
    headerTitle = 'ದೂರು/ಬೇಡಿಕೆ/ಸಲಹೆ'
  } else if(routeName === 'Profile') {
    headerTitle = 'ಪ್ರೊಫೈಲ್'
  }  else {
    headerTitle = routeName
  }
  return headerTitle
}
