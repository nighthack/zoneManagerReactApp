import React from 'react'
import { Icon } from 'native-base';

export default function getDashboardNavigatorTabIconName(
  navigation,
  tintColor
) {
  const { routeName } = navigation.state
  let iconName

  if (routeName === 'Home') {
    iconName = 'home'
  } else if (routeName === 'Profile') {
    iconName = 'ios-settings'
  } else if (routeName === 'Feedback') {
    iconName = 'ios-clipboard'
  }

  return <Icon name={iconName} style={{ color:tintColor, fontSize: 25 }} />
}
