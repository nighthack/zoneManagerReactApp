import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
...ApplicationStyles.screen,
  more: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
   postedOn: {
    fontSize: 11,
    color: 'rgba(36,42,56,0.5)'
  },
})
