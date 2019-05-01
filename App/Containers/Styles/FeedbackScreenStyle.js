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
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15
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
  /** Form **/
regForm: {
    width: '100%',
    marginBottom: 15
  },
  regText: {
    fontSize: 12,
    // 
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
    borderRadius: 3
  },
  infoHeader: {
    backgroundColor: '#242A38',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  infoHeaderText: {
    // 
    fontSize: 14,
    color: '#FFF'
  },
  fSelect: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.05)'
  },
    fSelectError: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: '#bb0000',
    backgroundColor: '#fff6f6',
  },
  fRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 5,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
    }),
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.05)'
  },
  fRowError: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 5,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
    }),
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#bb0000',
    backgroundColor: '#fff6f6',
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
    fontSize: 24
  },
  fInput: {
    flex: 1,
    // /
    fontSize: 12,
    paddingVertical: 8
  },

  fBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF8901',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 3,
    marginHorizontal: 15,
    marginBottom: 15
  },
  fBtnText: {
      
    fontSize: 14,
    color: '#FFF'
  },
  fBtnIcon: {
    // 
    fontSize: 12,
    color: '#FFF'
  },
  fErrorLabel:{
    color: '#bb0000',
    fontSize: 10,
    paddingLeft:15,
    // paddingVertical: 5,
    // position: 'absolute',
    // bottom: -15,
  },
    fDropdown:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.05)',
    position: 'relative',
  },
  fSearchInput: {
    flex: 1,
    padding: 0,
    // borderColor: 'red',
    // borderWidth: 2,
    paddingLeft: 10,
    paddingVertical: 13,
  },
  fSearchInputError: {
    flex: 1,
    padding: 0,
    // borderColor: 'red',
    // borderWidth: 2,
    paddingLeft: 10,
    paddingVertical: 13,
    borderColor: '#bb0000',
    backgroundColor: '#fff6f6',
  },
  pickerItem: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'rgba(36,42,56,0.05)',
    borderRightWidth: 0,
  },

})









  // /** Form **/
  // regForm: {
  //   width: '100%',
  //   marginBottom: 15
  // },
  // regText: {
  //   fontSize: 12,
  //   // 
  //   color: '#FFF'
  // },
  // infoBox: {
  //   backgroundColor: '#FFF',
  //   elevation: 10,
  //   shadowOffset: {
  //     width: 10,
  //     height: 10
  //   },
  //   shadowColor: '#999',
  //   shadowOpacity: 0.1,
  //   shadowRadius: 3,
  //   marginHorizontal: 20,
  //   marginBottom: 20,
  //   borderRadius: 3,
  //   padding: 15
  // },
  // fSelect: {
  //   position: 'relative',
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 15,
  //   paddingLeft: 5,
  //   borderBottomWidth: 1,
  //   borderColor: 'rgba(36,42,56,0.05)'
  // },
  // fSelectError: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 15,
  //   paddingLeft: 5,
  //   borderBottomWidth: 1,
  //   borderColor: '#bb0000',
  //   backgroundColor: '#fff6f6',
  // },
  // errorField: {
  //    borderColor: '#bb0000',
  //   backgroundColor: '#fff6f6',
  // },
  // fRow: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 5,
  //   ...Platform.select({
  //     ios: {
  //       paddingVertical: 10,
  //     },
  //   }),
  //   paddingHorizontal: 5,
  //   borderBottomWidth: 1,
  //   borderColor: 'rgba(36,42,56,0.07)'
  // },
  // fPicker: {
  //   flex: 1
  // },
  // fPickerItem: {
  //   flex: 1,
  //   width: '100%',
  //   paddingTop: 0,
  //   paddingBottom: 0
  // },
  // fIcon: {
  //   color: 'rgba(36,42,56,0.4)',
  //   fontSize: 24,
  //   width: 30,
  //   marginRight: 5
  // },
  // fInput: {
  //   flex: 1,
  //   // 
  //   fontSize: 12
  // },

  // fBtn: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#f5821f',
  //   paddingVertical: 15,
  //   paddingHorizontal: 15,
  //   borderRadius: 3,
  //   marginVertical: 15,
  // },
  // fBtnText: {
  //   // 
  //   fontSize: 14,
  //   color: '#FFF'
  // },
  // fBtnIcon: {
  //   // 
  //   fontSize: 16,
  //   color: '#FFF'
  // },

  // account: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginHorizontal: 20
  // },
  // accountText: {
  //   // 
  //   fontSize: 12,
  //   color: 'rgba(36,42,56,0.8)'
  // },
  // accountBtn: {
  //   paddingVertical: 5,
  //   paddingHorizontal: 5
  // },
  // accountBtnText: {
  //   // 
  //   fontSize: 12,
  //   color: 'rgba(36,42,56,0.99)'
  // },
  //   errorText: {  
  //   fontSize: 12,
  //   color: Colors.fire,
  //   marginBottom: Metrics.baseMargin,
  // },
  //   fRowError: {
  //   position: 'relative',
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 5,
  //   ...Platform.select({
  //     ios: {
  //       paddingVertical: 10,
  //     },
  //   }),
  //   paddingHorizontal: 5,
  //   marginBottom: 18,
  //   borderBottomWidth: 1,
  //   borderColor: '#bb0000',
  //   backgroundColor: '#fff6f6',
  // },
  // fErrorLabel:{
  //   color: '#bb0000',
  //   fontSize: 10,
  //   position: 'absolute',
  //   bottom: -15,
  // },