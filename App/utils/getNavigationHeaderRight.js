import React from 'react'
import { Icon } from 'native-base';

const onIconPress = (navigation, routeName) => {

  if (routeName === 'Profile') {
    navigation.navigate('EditProfile')
  }
}

export default function getNavigationHeaderRight(navigation) {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let iconName;
  if (routeName === 'Profile') {
    iconName = 'ios-arrow-back'
  }

  return (
    <Icon
      name={iconName}
      color="#000"
      size={20}
      style={{ marginRight: 16 }}
      onPress={() => onIconPress(navigation, routeName)}
    />
  )
}
