import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bgLayout: {},
  bgImg: {
    position: 'absolute',
    width: '100%',
    height: 230
  },
    hContent: {
    justifyContent: 'center',
    marginLeft: 10
  },
  hTopText: {
    fontSize: 20,
    // 
    color: '#FFF',
    marginBottom: 5
  },
  hTopDesc: {
    fontSize: 11,
    // 
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10
  },

})
