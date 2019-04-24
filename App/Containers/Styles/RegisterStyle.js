import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'


export default StyleSheet.create({
  /** Content **/
  ...ApplicationStyles.screen,
  bgLayout: {    
  },
  bgImg: {
    position: 'absolute',
    width: '100%',
    height: 220
  },

  /** Header **/
  hTop: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15
  },
  hImg: {
    height: 86,
    width: 86,
    borderRadius: 43,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
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
    marginBottom: 10,

  },
  hTopDesc: {
    fontSize: 12,
    // fontFamily: 'Montserrat-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10
  },

  /** Form **/
  regForm: {
    width: '100%',
    marginBottom: 15
  },
  regText: {
    fontSize: 12,
    // fontFamily: 'Montserrat-Regular',
    color: '#FFF'
  },
  infoBox: {
    backgroundColor: '#FFF',
    elevation: 10,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 3,
    padding: 15
  },
  fSelect: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.05)'
  },
  fRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
    }),
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.07)'
  },
  fPicker: {
    flex: 1
  },
  fPickerItem: {
    flex: 1,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0
  },
  fIcon: {
    color: 'rgba(36,42,56,0.4)',
    fontSize: 24,
    width: 30,
    marginRight: 5
  },
  fInput: {
    flex: 1,
    // fontFamily: 'Montserrat-Regular',
    fontSize: 12
  },

  fBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF8901',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 3
  },
  fBtnText: {
    // fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFF'
  },
  fBtnIcon: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#FFF'
  },

  account: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  accountText: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: 'rgba(36,42,56,0.8)'
  },
  accountBtn: {
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  accountBtnText: {
    // fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: 'rgba(36,42,56,0.99)'
  },
})
