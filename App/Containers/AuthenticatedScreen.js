import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { List, Avatar, Button, Card, Title, Paragraph, DataTable, IconButton } from 'react-native-paper';
import ListView from '../Containers/DemoList'
import HeaderComponent from '../Components/HeaderComponent'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'

// Styles
import styles from './Styles/AuthenticatedScreenStyle'

class AuthenticatedScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {
    // this.props.getBeneficiarySchemesList();
  }
  static navigationOptions = {
    headerTitle: 'Beneficiary Schemes',
  };
  render() {
    const { token } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HeaderComponent title={'Beneficiary Schemes'} {...this.props} />
        <ScrollView>
          <ListView />
        </ScrollView>
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBeneficiarySchemesList: () => dispatch(BeneficiaryActions.beneficiaryRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedScreen)