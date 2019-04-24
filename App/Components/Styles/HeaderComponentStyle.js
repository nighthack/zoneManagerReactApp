import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    zIndex: 1000,
  },
})
