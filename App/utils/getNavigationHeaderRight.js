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
  let type;
  if (routeName === 'Profile') {
    iconName = 'account-edit',
    type='MaterialCommunityIcons'
  }

  return (
    <Icon
      name={iconName}
      type={type}
      color="#000"
      size={20}
      style={{ marginRight: 16 }}
      onPress={() => onIconPress(navigation, routeName)}
    />
  )
}
