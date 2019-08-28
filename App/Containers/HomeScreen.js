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


export const SAMPLE_COURSE_CATEGORIES = [
  { icon: 'road', type: 'FontAwesome', title: 'ಅಭಿವೃಧ್ಧಿ ಕಾಮಗಾರಿ', route: 'DevelopmentWorksList' },
  { icon: 'ios-people', type: 'Ionicons', title: 'ಫಲಾನುಭವಿಗಳು', route: 'BeneficiaryListingScreen' },
  { icon: 'event-note', type: 'MaterialIcons', title: 'ದಿನಂಪ್ರತಿ ಕಾರ್ಯಕ್ರಮಗಳು', route: 'EventsListScreen' },
  { icon: 'feedback', type: 'MaterialIcons', title: 'ದೂರು/ಬೇಡಿಕೆ/ಸಲಹೆ', route: 'FeedbackList' },
  { icon: 'ios-timer', type: 'Ionicons', title: 'ಸಮಯಾವಕಾಶ ಕೋರಿಕೆ', route: 'AppointmentListScreen'},
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
