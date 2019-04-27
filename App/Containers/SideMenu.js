import React, { Component } from 'react'
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import LoginActions from '../Redux/LoginRedux'
import {
  Content,
  Text,
  // List,
  // ListItem,
  Icon,
  Container,
  // Left,
  Right,
  Badge,
  View
} from 'native-base';
import Styles from './Styles/SideMenuStyle'
import { Images } from '../Themes'

export const Menulist = [
  /** Transporter **/
  {
    name: 'Beneficiary Schemes',
    icon: 'dashboard',
    type: 'Octicons',
    route: 'Home'
  },
  {
    name: 'Development Works',
    icon: 'map-pin',
    type: 'Feather',
    route: 'DevelopmentWorksList'
  },
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
import { connect } from 'react-redux'

// Styles
import styles from './Styles/SideMenuStyle'

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }

    this.renderMenuList = this.renderMenuList.bind(this)
  }
  navigateToScreen = (route) =>  {
    const { navigate } = this.props.navigation;
    navigate(route)

  }
  onLogout = () => {
    const { access_token } = this.props.user;
    const accessToken = access_token;
    this.props.deleteToken(accessToken);
    const { navigate } = this.props.navigation;
    navigate('Login')
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
    const { user } = this.props;
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
              <Text style={Styles.navName}>{user ? user.name : 'Citizen'}</Text>
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

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteToken: (accessToken) => dispatch(LoginActions.logoutRequest(accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
