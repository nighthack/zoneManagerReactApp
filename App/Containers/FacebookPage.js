import React, { Component } from 'react';
import { WebView } from 'react-native'
import { Container, Header, Content, Icon, View } from 'native-base'
import { connect } from 'react-redux'
import { CustomActivityIndicator } from '../Components/ui';

class FacebookPage extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }
    static navigationOptions = {
        title: 'ನ್ಯೂಸ್ ಫೀಡ್',
        headerBackTitle: null,
      }
    hideSpinner() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <Container>

                <Content contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: '#F1F2F6'
                }}>
                    <WebView
                        source={{ uri: 'https://www.facebook.com/Sunilnaik581354/' }}
                        style={{ width: '100%', height: '100%' }}
                        onLoad={() => this.hideSpinner()}
                    />
                </Content>
                {
                    this.state.visible ? <CustomActivityIndicator /> : null
                }
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        //userObj: state.root.userDetails,
        fetching: state.root.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookPage);