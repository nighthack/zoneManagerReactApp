import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: 8
  },
  imgView: {
    alignItems: 'center',
    marginVertical: 12
  },

  inputView: {
    marginTop: 16
  },
  input: {
    marginTop: 8
  },
  loginText: {
    color: Colors.snow,
    fontSize: 16,
    fontWeight: 'bold'
  },
  regText: {
    color: Colors.panther,
    fontSize: 14,
    fontWeight: 'bold'
  },
  btn: {
    marginTop: 10
  },
  account: {
    textAlign: 'center',
    marginTop: 12
  },
  forgot: {
    alignItems: 'flex-end',
    marginTop: 16
  },
  appName: {
    color: Colors.bjpOrange,
    fontSize: 20,
    fontWeight: 'bold'
  }
})

