import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes'

// screenWidth
// screenHeight
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  layout: {
    flex: 1
  },
  nav: {
    flex: 1
  },
  navProfile: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  bgImg: {
    position: 'absolute',
    width: '120%',
    height: 230
  },
  navImg: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },

  navMenu: {
    flex: 7,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 5
  },
  navAvatar: {
    width: 64,
    height: 64,
    borderRadius: 37,
    alignItems: 'center'
  },
  navName: {
    fontSize: 14,
    // fontFamily: 'Montserrat-SemiBold',
    color: '#F5821F',
    marginTop: 10
  },

  profileItem: {
    marginTop: 10,
    marginBottom: 10
  },
  navBtn: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  navBtnIcon: {
    fontSize: 24
  },
  navBtnLeft: {
    width: 30,
    marginRight: 20
  },
  navBtnText: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#333'
  },
  navHeader: {
    // fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#242A38',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20
  },
  navFooter: {
    flex: 1
  },
  navFooterText: {
    fontSize: 12,
    // fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,0.5)'
  }

})