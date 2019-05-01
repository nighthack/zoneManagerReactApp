import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.theme,
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
    hColumn: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    hContent: {
      justifyContent: 'center',
      marginLeft: 10
    },
    hTopText: {
      fontSize: 20,
       
      color: '#FFF',
      marginBottom: 5
    },
    hTopDesc: {
      fontSize: 11,
       
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
      fontSize: 11,
       
      color: '#FFF'
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
      marginBottom: 20,
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
        
      color: 'rgba(36,42,56,1)'
    },
    truckData: {
      fontSize: 12,
       
      color: 'rgba(36,42,56,0.7)'
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
    editBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F1F2F6',
      borderRadius: 5,
      margin: 10,
      padding: 5
    },
    editIcon: {
      fontSize: 14,
      paddingLeft: 5,
      color: 'rgba(36,42,56,0.9)'
    },
    editText: {
      fontSize: 10,
       
      paddingHorizontal: 5,
      color: 'rgba(36,42,56,0.9)'
    }

})
