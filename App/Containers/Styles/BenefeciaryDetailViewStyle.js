import { StyleSheet, Platform } from 'react-native'
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
  hTopDesc: {
    fontSize: 11,
    // 
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
    // 
    fontSize: 11,
    color: '#FFF'
  },

  /** Search **/
  search: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 3,
    marginBottom: 15
  },
  searchInput: {
    flex: 1,
    // 
    fontSize: 12,
    paddingVertical: 12
  },
  searchIcon: {
    fontSize: 16,
    paddingVertical: 12,
    color: 'rgba(36,42,56,0.5)'
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
    marginHorizontal: 20,
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
    marginVertical: 4,
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tripPlaces: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripIcon: {
    fontSize: 12,
    paddingHorizontal: 5,
    color: '#ffcc00'
  },
  placeText: {
    fontSize: 11,
    // 
    marginLeft: 5,
    color: 'rgba(36,42,56,0.9)'
  },
  
  lineTracker: {
    fontSize: 18,
    color: '#ffcc00',
    marginLeft: 17,
    top: 20,
    position: 'absolute'
  },

  more: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  price: {
    fontSize: 20,
      
    color: 'rgba(36,42,56,0.99)'
  },
  postedOn: {
    fontSize: 11,
    // 
    color: 'rgba(36,42,56,0.5)'
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F2F6',
    borderRadius: 5,
    padding: 5
  },
  editIcon: {
    fontSize: 14,
    paddingLeft: 5,
    color: 'rgba(36,42,56,0.9)'
  },
  editText: {
    fontSize: 10,
    // 
    paddingHorizontal: 5,
    color: 'rgba(36,42,56,0.9)'
  },

  msgBox: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: 'rgba(36,42,56,0.07)',
    padding: 15
  },
  msgText: {
    fontSize: 11,
    // 
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
      
    color: '#FFF',
    alignSelf: 'center'
  },
  infoLabel: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 10,
    marginBottom: 4,
  },
    listContent: {
    // marginTop: Metrics.baseMargin
  },
})
