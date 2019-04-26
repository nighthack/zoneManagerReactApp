import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
...ApplicationStyles.screen,
  bgLayout: {    
  },
  bgImg: {
    position: 'absolute',
    width: '100%',
    height: 230
  },
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
    /** Header **/
  hTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 5
  },
  hImg: {
    fontSize: 64,
    color: '#FFD328'
  },
  hRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hContent: {
    justifyContent: 'center',
    marginLeft: 10
  },
  hTopText: {
    fontSize: 20,
    // fontFamily: 'Montserrat-Regular',
    color: '#FFF',
    marginBottom: 5
  },
  hTopDesc: {
    fontSize: 11,
    // fontFamily: 'Montserrat-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10
  },

  addBtn: {
    backgroundColor: '#FF8901',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0
  },
  addText: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: '#FFF'
  },
  cardItemLabel: {
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 12,
  }
})
