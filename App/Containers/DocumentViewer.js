import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, TouchableOpacity,Dimensions, Platform, WebView } from 'react-native';
import { Container, Header, Content, Icon, Text, View, Badge } from 'native-base';

import Styles from './Styles/BenefeciaryDetailViewStyle';
import Pdf from 'react-native-pdf';


const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight =  Dimensions.get('window').height;

class DocumentViewer extends Component {
    constructor(props){
        super(props);
    }


    renderSliderImage(data){
        if(Platform.OS === 'ios'){
          return ( < WebView 
                    source={{ uri: data.filePath }}
                    onLoad={this.onFinish}
                    style={{flex:1, width: ScreenWidth}}
                    originWhitelist={['*']} /> );
        }else {
        return(
                <Pdf
                    source={'file://' + data.filePath}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                style={{flex:1, width: ScreenWidth}}/>
            );
        }
       
    }

    render(){
        const {navigation} = this.props;
        const backScreen = navigation.getParam('backScreen', 'NetworkError');
        const data = navigation.getParam('data', {});
        return (
            <Container>
                <Header style={Styles.navigation}>
                    <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
                    <View style={Styles.nav}>
                        <View style={Styles.navLeft}>
                            <View style={Styles.navLeft}>
                            </View>
                        </View>
                        <View style={Styles.navMiddle}>
                            <Text style={Styles.logo}>{data.label}</Text>
                        </View>
                        <TouchableOpacity style={Styles.navRight}
                            onPress={() => { navigation.navigate(backScreen); }}>
                            <Icon name='times' type="FontAwesome5" style={Styles.navIcon} />
                        </TouchableOpacity>
                    </View>
                </Header> 
                <Content contentContainerStyle={[Styles.layoutDefault, {backgroundColor: '#242A38'}]}>

                    {this.renderSliderImage(data)}
                
                </Content>   
            </Container>
        )
    }
}

export default DocumentViewer;