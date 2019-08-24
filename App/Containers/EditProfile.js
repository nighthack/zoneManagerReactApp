import React from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { SafeAreaViewWrapper, CustomStatusBar } from '../Components/ui';
import { EditProfileForm } from '../Components/forms';
import { CustomActivityIndicator } from '../Components/ui';


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

  formatUserObj(data) {
    if (data) {
      const namesBreakup = data.name.split(" ");
      const first_name = namesBreakup[0];
      const last_name = namesBreakup[1] || '';
      return {
        ...data,
        first_name,
        last_name,
      }
    }
    return {};
  }

  render() {
    const { userObj, loading } = this.props
    return (
      <SafeAreaViewWrapper extraStyles={{ backgroundColor: '#f5f5f2' }}>
        <Container>
          <CustomStatusBar />
          <PageContentWrapper>
            {
              userObj && <EditProfileForm
              loading={loading}
              onSubmit={values => this.onFormSubmit(values)}
              initialValues={this.formatUserObj(userObj.user)}
            />
            }
          </PageContentWrapper>
          {
            loading ? <CustomActivityIndicator /> : null
          }
        </Container>
      </SafeAreaViewWrapper>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userObj: state.root.userDetails,
    loading: state.root.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
