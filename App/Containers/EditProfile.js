import React from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { SafeAreaViewWrapper, CustomStatusBar } from '../Components/ui';
import { EditProfileForm } from '../Components/forms';


export const PageContentWrapper = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f5f5f2;
`
export const headerStyle = styled.View`
  backgroundColor: '#f5f5f2',
  borderBottomColor: 'transparent'
`

class EditProfile extends React.Component {
  static navigationOptions = {
    title: 'ಪ್ರೊಫೈಲ್ ಎಡಿಟ್',
    headerStyle
  }

  state = {
    formLoading: false
  }

  onFormSubmit(values) {
    const { navigation } = this.props

    this.setState({ formLoading: true })

    const { email, password } = values

    setTimeout(() => {
      this.setState({ formLoading: false })
      navigation.navigate('Dashboard')
    }, 1500)
  }

  render() {
    const { navigation, userObj } = this.props
    const { formLoading } = this.state
    console.log(userObj);
    return (
      <SafeAreaViewWrapper extraStyles={{ backgroundColor: '#f5f5f2' }}>
        <Container>
          <CustomStatusBar />
          <PageContentWrapper>
            <EditProfileForm
              loading={formLoading}
              onSubmit={values => this.onFormSubmit(values)}
              initialValues={userObj.user}
            />
          </PageContentWrapper>
        </Container>
      </SafeAreaViewWrapper>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userObj: state.root.userDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
