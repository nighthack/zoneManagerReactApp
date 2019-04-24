import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    // backgroundColor: Colors.background
    marginTop: 50,
  },
  row: {
    flex: 1,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    // boxShadow: '10px 5px 5px black',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ccc',
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10,
    padding: Metrics.baseMargin,
    margin: Metrics.smallMargin,
    backgroundColor:'#F7F7F7',
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    // color: Colors.snow
  },
  listContent: {
    // marginTop: Metrics.baseMargin
  },
  cardLabel: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: Metrics.smallMargin,
    color: '#2e3192',
  },
  cardText: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: Metrics.baseMargin,
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  badgeStyle: {
    backgroundColor: Colors.bjpOrange,
    color: Colors.snow,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: Metrics.baseMargin,
    marginBottom:Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
  }
})
