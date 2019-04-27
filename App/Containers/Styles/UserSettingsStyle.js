import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
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
    marginBottom: 30,
    marginHorizontal: 20
  },
  hImg: {
    width: 64,
    height: 64,
    borderRadius: 32
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
  hIcon: {
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#e64d00',
    borderRadius: 25,
    textAlign: 'center',
    padding: 2
  },
  imgEdit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    position: 'absolute',
    borderRadius: 12,
    backgroundColor: '#FF8901',
    left: 0,
    bottom: 0
  },
  imgEditIcon: {
    color: '#FFF',
    fontSize: 16
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
    borderRadius: 3
  },
  infoHeader: {
    backgroundColor: '#242A38',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  infoHeaderText: {
    // fontFamily: 'Montserrat-Regular',
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
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.05)'
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
    // fontFamily: 'Montserrat-Regular',
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
    // fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFF'
  },
  fBtnIcon: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#FFF'
  },
   hUserIcon: {
    fontSize: 64,
    color: '#FFD328'
  },
})
