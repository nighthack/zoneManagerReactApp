import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

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
    marginHorizontal: 15,
    marginBottom: 15
  },
  hImg: {
    fontSize: 48,
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

  /** Trip List **/
  tripItem: {
    flex: 1,
    backgroundColor: '#FFF',
    elevation: 10,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 15,

    marginVertical: 20,
    borderRadius: 3
  },
  truckInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: 'rgba(36,42,56,0.07)',
    borderBottomWidth: 1
  },
  truckTrip: {
    fontSize: 14,
    // fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(36,42,56,1)'
  },
  truckData: {
    fontSize: 12,
    // fontFamily: 'Montserrat-Regular',
    color: 'rgba(36,42,56,0.7)',
    lineHeight: 18
  },
  truckFare: {
    // fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'rgba(36,42,56,0.99)'
  },
  checkIcon: {
    fontSize: 20,
    color: 'rgba(36,42,56,0.4)'
  },
  truckImg: {
    width: 100,
    height: 75,
    borderRadius: 3
  },
  tripInfo: {
    borderColor: 'rgba(36,42,56,0.07)',
    borderBottomWidth: 1,
    padding: 10
  },
  rowSpaceAlignment: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tripPlaces: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tripIcon: {
    fontSize: 12,
    paddingHorizontal: 5
  },
  placeText: {
    fontSize: 11,
    // fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    color: 'rgba(36,42,56,0.9)'
  },
  lineTracker: {
    fontSize: 18,
    color: '#ffcc00',
    marginLeft: 17,
    top: 20,
    position: 'absolute'
  },

    
  msgBox: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.07)',
    padding: 15
  },
  msgText: {
    fontSize: 11,
    // fontFamily: 'Montserrat-Regular',
    color: 'rgba(36,42,56,0.7)',
    lineHeight: 16
  },
  decisionBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 15
  },
  acceptBtn: {
    backgroundColor: '#1aaa55',
    borderRadius: 3,
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  rejectBtn: {
    backgroundColor: '#db3b21',
    borderRadius: 3,
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  btnText: {
    fontSize: 11,
    // fontFamily: 'Montserrat-SemiBold',
    color: '#FFF',
    alignSelf: 'center'
  }
})
