import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Styles from './Styles/NetworkErrorScreenStyle'

export default class NetworkErrorScreen extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    return (
      <Container>
        <Content style={Styles.container}>
          <Text>
            Network Error
          </Text>
        </Content>
      </Container>
    )
  }
}
