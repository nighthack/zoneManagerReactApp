export default function getDashboardNavigatorHeaderTitle(navigation) {
  const { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle

  if (routeName === 'Home') {
    headerTitle = 'Courses'
  } else if (routeName === 'MyCourses') {
    headerTitle = 'My Courses'
  } else {
    headerTitle = routeName
  }

  return headerTitle
}
