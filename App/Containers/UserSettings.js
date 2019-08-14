import React, { Component } from 'react'
import { Container, Content } from 'native-base';
import styled from 'styled-components/native'
import {
  SafeAreaViewWrapper,
  CustomStatusBar,
  ProfileMenuOption
} from '../Components/ui'
import { SectionHeader } from '../Components/headers'
import { CustomActivityIndicator } from '../Components/ui';
import { connect } from 'react-redux'


const ProfileHeroWrapper = styled.View`
  flex-direction: row;
  padding: 16px;
`

const UserDetailsWrapper = styled.View`
  flex: 1;
  margin-left: 10;
  justify-content: center;
`

const UsernameText = styled.Text`
  font-size: 17;
`

const PointsText = styled.Text`
  font-size: 14;
  color: #8a8a8f;
  margin-top: 4;
`

class UserSettings extends Component {
  render() {
    const { fetching, navigation, userObj } = this.props;
    const user = userObj && userObj.user ? userObj.user : {};
    console.log(navigation);
    return (
      <SafeAreaViewWrapper>
        <Container>
          <CustomStatusBar />
          <Content>
            <ProfileHeroWrapper>
              <UserDetailsWrapper>
                <UsernameText>{user.name}</UsernameText>
                <PointsText>{user.phone}</PointsText>
              </UserDetailsWrapper>
            </ProfileHeroWrapper>
            <SectionHeader>ಸೆಟ್ಟಿಂಗ್‌ಗಳು</SectionHeader>
            <ProfileMenuOption
              showDivider
              iconName="ios-information-circle"
              iconColor="#346df1"
              text="About Us"
              onPress={() => this.toggleModal('showAboutModal')}
            />
            <ProfileMenuOption
              iconName="md-log-out"
              iconColor="#000"
              text="Sign Out"
              onPress={() => resetNavigationStack(navigation)}
            />
          </Content>
        </Container>
        {
          fetching ? <CustomActivityIndicator /> : null
        }
      </SafeAreaViewWrapper>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    userObj: state.root.userDetails,
    fetching: state.root.fetching,
  }
}

export default connect(mapStateToProps, null)(UserSettings)
