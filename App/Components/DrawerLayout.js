import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  View,
  Footer
} from 'native-base';
import Styles from './Styles/DrawerLayoutStyle'
import { Images } from '../Themes'
const drawerImage = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

export const Menulist = [
  /** Transporter **/
  {
    name: 'Beneficiary Schemes',
    icon: 'dashboard',
    type: 'Octicons',
    route: 'Home'
  },
  // {
  //   name: 'Trip',
  //   icon: 'map-pin',
  //   type: 'Feather',
  //   route: 'TransporterTrip'
  // },
  // {
  //   name: 'Truck',
  //   icon: 'truck',
  //   type: 'FontAwesome',
  //   route: 'TransporterTruck'
  // },
  // {
  //   name: 'Messages',
  //   icon: 'envelope',
  //   type: 'SimpleLineIcons',
  //   route: 'TransporterMessage'
  // },
  // {
  //   name: 'Profile',
  //   icon: 'user',
  //   type: 'Feather',
  //   route: 'TransporterProfile'
  // },
  // {
  //   name: 'Settings',
  //   icon: 'settings',
  //   type: 'SimpleLineIcons',
  //   route: 'TransporterSettings'
  // }
]
export default class DrawerLayout extends Component {
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
  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }

    this.renderMenuList = this.renderMenuList.bind(this)
  }
  navigateToScreen = (route) => (
    () => {
      const { navigate } = this.props.navigation;
      navigate(route)
    })
  onLogout = () => {
    console.log(AsyncStorage)
    async () => {
      try {
        await AsyncStorage.removeItem('user')
      } catch (e) {
        debugger;
      }
      console.log('Done.')
    }
    this.navigateToScreen('Home');
  }
  renderMenuList(menus) {
    return menus.map((menu) => {
      return (
        <TouchableOpacity key={menu.route} style={Styles.profileItem} underlayColor='transparent' onPress={() => {
          this.navigateToScreen(menu.route)
        }}>
          <View style={Styles.navBtn}>
            <View style={Styles.navBtnLeft}>
              <Icon name={menu.icon} type={menu.type || 'FontAwesome'} style={Styles.navBtnIcon} />
            </View>
            <Text style={Styles.navBtnText}>{menu.name}</Text>
          </View>
          {
            menu.types &&
            <Right style={{ flex: 1 }}>
              <Badge>
                <Text
                  style={Styles.badgeText}
                >{`${menu.types}`}</Text>
              </Badge>
            </Right>
          }
        </TouchableOpacity>
      )
    })
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          contentContainerStyle={Styles.layout}
          render
        >
          <Image source={Images.navImage} resizeMode='cover' style={Styles.navImg} />
          <View style={Styles.nav}>
            <View style={Styles.navProfile}>
              <Image source={Images.background} style={Styles.bgImg} />
              <Image style={Styles.navAvatar} source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
              <Text style={Styles.navName}>Megan Fox</Text>
            </View>

            <View style={Styles.navMenu}>
              <ScrollView>
                {this.renderMenuList(Menulist)}
              </ScrollView>

            </View>

          </View>
          <TouchableOpacity style={Styles.acceptBtn} onPress={this.onLogout}>
            <Text style={Styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    )
  }
}
