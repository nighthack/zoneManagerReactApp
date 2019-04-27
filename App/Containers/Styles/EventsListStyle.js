import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

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
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
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
    // fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10
  },

  infoBox: {
    flex: 1,
    marginBottom: 10
  },
  orderItem: {
    flex: 1,
    backgroundColor: '#FFF',
    elevation: 10,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 0,
    marginBottom: 10,
    borderRadius: 3,
    flexDirection: 'row'
  },

  /** Tab **/
  scrollBg: {    
    minHeight: 40,
    backgroundColor: 'transparent',
    marginBottom: 20,
    borderBottomWidth: 0,
    marginHorizontal: 20
  },
  tabMain: {
    borderBottomWidth: 0,
    elevation: 0
  },
  tabFixed: {
    flex: 1,
    height: '100%'
  },
  tabBg: {
    backgroundColor: 'transparent'
  },
  tabHeading: {
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    height: 20,
    paddingVertical: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3
  },
  tabTxt: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  },  
  activeTabStyle: {
    backgroundColor: '#FFD328'
  },
  activeTextStyle: {
    // fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#FFF'
  },
  tabUnderLine: {
    borderColor: '#FFD328',
    borderBottomWidth: 4
  },
  tabContent: {
    flex: 1
  },
  
  /** Booking **/
  bookingItem: {
    flex: 1,
    backgroundColor: '#FFF',
    elevation: 10,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 15,
    borderRadius: 3,
    marginHorizontal: 20
  },
  tripTo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'rgba(36,42,56,0.1)',
    borderBottomWidth: 1,
    padding: 10
  },
  productText: {
    fontSize: 16,
    // fontFamily: 'Montserrat-Regular'
  },
  priceText: {
    fontSize: 16,
    // fontFamily: 'Montserrat-SemiBold'
  },

  tripDest: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  truckImg: {
    width: 80,
    height: 60,
    marginRight: 5,
    borderRadius: 3
  },
  locations: {
    justifyContent: 'center'
  },
  locationIcon: {
    fontSize: 20
  },
  colorGreen: {
    color: 'green'
  },
  colorRed: {
    color: 'red'
  },
  placeText: {
    fontSize: 12,
    // fontFamily: 'Montserrat-Regular',
    alignSelf: 'center'
  },
  truckInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffcc00',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  truckIcon: {
    fontSize: 20,
    alignSelf: 'center',
    marginRight: 5,
    color: 'rgba(36,42,56,0.99)'
  },
  truckText: {
    fontSize: 11,
    // fontFamily: 'Montserrat-Regular',
    alignSelf: 'center'
  },
  
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  orderText: {
    fontSize: 11,
    // fontFamily: 'Montserrat-Regular',
    color: '#333'
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
    lineHeight: 16,
    textAlign:'left',
  },
})
