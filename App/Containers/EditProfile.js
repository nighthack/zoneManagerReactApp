import React from 'react'
import { Container } from 'native-base'
import styled from 'styled-components/native'
import { SafeAreaViewWrapper, CustomStatusBar } from '../Components/ui'
import { SignInForm } from '../Components/forms'


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
    title: 'Log in',
    headerStyle
  }

  state = {
    formLoading: false
  }

  onFormSubmit(values) {
    const { navigation } = this.props

    this.setState({ formLoading: true })

    // const { email, password } = values

    setTimeout(() => {
      this.setState({ formLoading: false })
      navigation.navigate('Dashboard')
    }, 1500)
  }

  render() {
    const { navigation } = this.props
    const { formLoading } = this.state

    return (
      <SafeAreaViewWrapper extraStyles={{ backgroundColor: '#f5f5f2' }}>
        <Container>
          <CustomStatusBar />

          <PageContentWrapper>
            <SignInForm
              loading={formLoading}
              onSubmit={values => this.onFormSubmit(values)}
              onSignUpPress={() => navigation.navigate('SignUp')}
            />
          </PageContentWrapper>
        </Container>
      </SafeAreaViewWrapper>
    )
  }
}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
