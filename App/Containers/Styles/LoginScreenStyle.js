import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'
const React = require('react-native')
const { Platform } = React

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  /** Content **/
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


  /** Form **/
  regForm: {
    width: '100%',
    marginBottom: 15
  },
  regText: {
    fontSize: 12,
     
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
    borderRadius: 3,
    padding: 15
  },
  fSelect: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
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
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.07)'
  },
  fRowError: {
    position: 'relative',
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
    marginBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#bb0000',
    backgroundColor: '#fff6f6',
  },
  fErrorLabel:{
    color: '#bb0000',
    fontSize: 10,
    position: 'absolute',
    bottom: -15,
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
    fontSize: 12
  },

  fBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5821F',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 3,
    marginTop: 15
  },
  fBtnText: {
       
    fontSize: 14,
    color: '#FFF'
  },
  fBtnIcon: {
     
    fontSize: 16,
    color: '#FFF'
  },
  forgotPassword: {
     
    fontSize: 12,
    alignSelf: 'flex-end',
    color: 'rgba(36,42,56,0.8)'
  },

  account: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  accountText: {
     
    fontSize: 12,
    color: 'rgba(36,42,56,0.8)'
  },
  accountBtn: {
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  accountBtnText: {
    //    
    fontSize: 12,
    color: 'rgba(36,42,56,0.99)'
  },

  connect: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  connectOr: {
    flex: 1,
    width: '100%'
  },
  connectText: {
       
    fontSize: 18,
    marginBottom: 15,
    color: 'rgba(36,42,56,0.99)',
    alignSelf: 'center'
  },
  connectLine: {
    flex: 1,
    position: 'absolute',
    borderBottomWidth: 1,
    borderColor: '#FF0000'
  },
  connectHeader: {
       
    fontSize: 12,
    color: 'rgba(36,42,56,0.99)',
    alignSelf: 'center',
    marginBottom: 15
  },
  smn: {
    flexDirection: 'row'
  },
  smnBtn: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 3
  },
  smnIcon: {
    fontSize: 18,
    color: '#FFF',
    marginRight: 5
  },
  smnText: {
       
    fontSize: 14,
    color: '#FFF'
  },
  facebook: {
    backgroundColor: '#395498'
  },
  googlePlus: {
    backgroundColor: '#D64937'
  },
  errorText: {  
    fontSize: 12,
    color: Colors.fire,
    marginBottom: Metrics.baseMargin,
  },

})
