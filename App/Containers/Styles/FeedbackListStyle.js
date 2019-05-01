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

  /** Message List **/
  msg: {    
  },
  msgItem: {
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
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  msgLeft: {
    padding: 15
  },
  msgRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10
  },
  infoLabel: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 10,
    marginBottom: 4,
  },
  msgContent: {
    // 
    fontSize: 11,
    color: 'rgba(36,42,56,0.7)',
    marginBottom: 10
  },
  msgOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15
  },
  msgDate: {
    // 
    fontSize: 10,
    color: 'rgba(36,42,56,0.4)'
  },
  msgDelete: {
    fontSize: 16,
    color: 'rgba(36,42,56,0.7)',
    alignSelf: 'flex-end'
  },


  nameTitle: {
    fontSize: 20,
    // 
    color: '#FFF',
    marginBottom: 5
  },
  regDesc: {
    fontSize: 12,
    // 
    color: '#FFF',
    marginBottom: 10
  },
  regForm: {
    width: '100%'
  },
  infoBox: {
    backgroundColor: '#FFF'
  },
  descInfo: {
    flexDirection: 'row'
  },
  descLeft: {
    flex: 1.5,
    justifyContent: 'center'
  },
  descImg: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  descMiddle: {
    flex: 7
  },
  middleText: {
    fontSize: 12,
    // 
    marginLeft: 5
  },
  middleDesc: {
    fontSize: 11,
    // 
    color: '#666',
    lineHeight: 15,
    marginLeft: 5
  },
  descRight: {
    flex: 1.5,
    justifyContent: 'flex-start'
  },
  rightText: {
    fontSize: 12,
    // 
    color: '#333',
    alignSelf: 'center',
    marginLeft: 10
  },
})
