import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

const React = require('react-native')
const { Platform } = React
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    // *** Content *** //
    layoutDefault: {
      flexGrow: 1,
      backgroundColor: '#F1F2F6'
    },

    // *** text header *** //
    // *** status and action bar *** //
    navigation: {
      shadowOpacity: 0,
      elevation: 0,
      shadowOffset: {
        height: 0
      },
      shadowRadius: 0,
      width: '100%',
      borderBottomWidth: 0,
      borderColor: '#FFF',
      backgroundColor: '#242A38'
    },
    navigationTransparent: {
      backgroundColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
      shadowOffset: {
        height: 0
      },
      shadowRadius: 0,
      width: '100%',
      borderBottomWidth: 0,
      borderWidth: 0
    },
    nav: {
      flex: 1,
      marginLeft: -5,
      marginRight: -5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    navTitle: {
      color: '#FFF',
      fontFamily: 'Amigos',
      fontSize: 18
    },
    navSubTitle: {
      color: '#FFF',
      fontSize: 10
    },
    navLeft: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    navMiddle: {
      flex: 7,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navLeftBtn: {
      paddingLeft: 15,
      paddingRight: 15
    },
    navRight: {
      flex: 1.5,
      alignItems: 'center'
    },
    navIcon: {
      color: '#FFD328'
    },
    navIconDark: {
      color: '#000'
    },
    navIconLight: {
      color: '#FFF'
    },
    navIconPrimary: {
      color: '#000'
    },
    navRightBtn: {
      borderWidth: 1,
      borderColor: '#FFF',
      padding: 8,
      borderRadius: 5
    },
    navAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 10
    },


    textHeader: {
      fontSize: 24,
      color: '#FFF'
    },
    textDesc: {
      fontSize: 16,
      color: '#FFF'
    },

    // *** footer *** //
    footerBg: {
      backgroundColor: '#FFF'
    },
    fTab: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10
    },
    fIcons: {
      backgroundColor: '#FFF'
    },
    iconActive: {
      ...Platform.select({
        ios: {
          color: '#cc99ff',
          fontSize: 24
        },
        android: {
          color: '#cc99ff',
          fontSize: 18,
          alignSelf: 'center'
        }
      })
    },
    iconInactive: {
      ...Platform.select({
        ios: {
          fontSize: 24,
          color: '#CCC'
        },
        android: {
          fontSize: 18,
          alignSelf: 'center',
          color: '#CCC'
        }
      })
    },
    textActive: {
      fontSize: 11,
      color: '#cc99ff'
    },
    textInactive: {
      fontSize: 11,
      color: '#CCC'
    },
    acceptBtn: {
      backgroundColor: '#1aaa55',
      borderRadius: 3,
      paddingHorizontal: 30,
      paddingVertical: 10
    },
    btnText: {
      fontSize: 11,
      // fontFamily: 'Montserrat-SemiBold',
      color: '#FFF',
      alignSelf: 'center'
    },
    logo: {
      fontSize: 16,
      color: '#FFD328'
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
    fSelect: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderColor: 'rgba(36,42,56,0.05)'
    },
  }
}

export default ApplicationStyles
