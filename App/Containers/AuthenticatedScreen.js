import React, { Component } from 'react'
import { ScrollView, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AuthenticatedScreenStyle'

class AuthenticatedScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    const { partial } = this.props;
    let addExternalFiles = `
    var link = document.createElement( "link" );
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName( "head" )[0].appendChild( link );`;
    console.log(partial);
    return (
      <WebView
        source={{ uri: partial }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={addExternalFiles}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    partial: state.login.responsePartial,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedScreen)
