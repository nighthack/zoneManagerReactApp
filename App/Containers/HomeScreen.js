import React from 'react'
import { Container, Content } from 'native-base';
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';
import styled from 'styled-components/native'
import EventActions from '../Redux/EventRedux'
import { SafeAreaViewWrapper, CustomStatusBar } from '../Components/ui'
import { FeaturedCoursesListView } from '../Components/list-views'
import { CourseCategoriesGridView } from '../Components/grid-views'

export const SAMPLE_FEATURED_COURSES = [
  {
    title: 'Learn Product Photography - The Right Way',
    price: '$29.99',
    photoURL: 'https://imgur.com/rRyGXyP.png'
  },
  {
    title: 'Flower arrangements like a Pro!',
    price: '$19.99',
    originalPrice: '$29.99',
    photoURL: 'https://imgur.com/lu3RVHY.png'
  },
  {
    title: 'Introduction to Football (Soccer) Tactics',
    price: '$9.99',
    originalPrice: '$19.99',
    photoURL: 'https://imgur.com/NLccF0H.png'
  },
  {
    title: 'Learn How 2 Dance - Salsa (Beginner)',
    price: '$10.99',
    photoURL: 'https://imgur.com/VXp5sUc.png'
  },
  {
    title: 'Meal Planning Masterclass: Create Your Own Meal Plan',
    price: '$10.99',
    photoURL: 'https://imgur.com/9yxW634.png'
  }
]
export const SAMPLE_COURSE_CATEGORIES = [
  { icon: 'calendar', type: 'AntDesign', title: 'ಅಭಿವೃಧ್ಧಿ ಕಾಮಗಾರಿ', route: 'DevelopmentWorksList' },
  { icon: 'dashboard', type: 'Octicons', title: 'ಫಲಾನುಭವಿಗಳು', route: 'BeneficiaryListingScreen' },
  { icon: 'toolbox', type: 'FontAwesome5', title: 'ದಿನಂಪ್ರತಿ ಕಾರ್ಯಕ್ರಮಗಳು', route: 'EventsListScreen' },
  { icon: 'envelope', type: 'SimpleLineIcons', title: 'ದೂರು/ಬೇಡಿಕೆ/ಸಲಹೆ', route: 'FeedbackList' },
  { icon: 'settings', type: 'SimpleLineIcons', title: 'ಸಮಯಾವಕಾಶ ಕೋರಿಕೆ', route: 'AppointmentListScreen'},
]
const Heading = styled.Text`
  font-size: 15;
  padding: 16px 16px 8px;
  margin-bottom: 10;
`

class HomeScreen extends React.Component {

  componentDidMount() {
    this.onTableFetchRequest();
  }

  onTableFetchRequest = (pageID) => {
    const { fetching } = this.props;
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (!fetching) {
        this.props.getEventsList(accessToken, pageID);
      }
    });
  }

  render() {
    const { loading, data } = this.props
    const { navigation } = this.props
    return (
      <SafeAreaViewWrapper>
        <Container>
          <CustomStatusBar />
          <Content>
            <Heading>ಕಾರ್ಯಕ್ರಮಗಳು</Heading>
            <FeaturedCoursesListView
              loading={loading}
              items={data}
              onItemPress={item =>  navigation.navigate("EventDetailScreen", { selectedData: item })}
            />
            <Heading>ವಿಭಾಗಗಳು</Heading>
            <CourseCategoriesGridView
              items={SAMPLE_COURSE_CATEGORIES}
              onItemPress={item =>
                navigation.navigate(item.route)
              }
            />
          </Content>
        </Container>
      </SafeAreaViewWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.event.oldListData,
    loading: state.event.fetching,
    listError: state.event.listError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventsList: (accessToken, pageNo) =>
      dispatch(EventActions.oldEventOnListRequest(accessToken, pageNo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
