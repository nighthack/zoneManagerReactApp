import React from 'react'
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import styled from 'styled-components/native'
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
  { icon: 'calendar', type: 'AntDesign', title: 'ಅಭಿವೃಧ್ಧಿ ಕಾಮಗಾರಿ', },
  { icon: 'dashboard', type: 'Octicons', title: 'ಫಲಾನುಭವಿಗಳು' },
  { icon: 'toolbox', type: 'FontAwesome5', title: 'ದಿನಂಪ್ರತಿ ಕಾರ್ಯಕ್ರಮಗಳು' },
  { icon: 'envelope', type: 'SimpleLineIcons', title: 'ದೂರು/ಬೇಡಿಕೆ/ಸಲಹೆ' },
  { icon: 'settings', type: 'SimpleLineIcons', title: 'ಸಮಯಾವಕಾಶ ಕೋರಿಕೆ' },
]
const Heading = styled.Text`
  font-size: 15;
  padding: 16px 16px 8px;
  margin-bottom: 10;
`

class HomeScreen extends React.Component {
  state = {
    loading: false,
    featuredCourses: []
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({
        featuredCourses: SAMPLE_FEATURED_COURSES,
        loading: false
      })
    }, 1500)
  }

  render() {
    const { loading, featuredCourses } = this.state
    const { navigation } = this.props

    return (
      <SafeAreaViewWrapper>
        <Container>
          <CustomStatusBar />

          <Content>
            <Heading>Featured</Heading>
            <FeaturedCoursesListView
              loading={loading}
              items={featuredCourses}
              onItemPress={item => navigation.navigate('CourseDetails')}
            />

            <Heading>ವಿಭಾಗಗಳು</Heading>
            <CourseCategoriesGridView
              items={SAMPLE_COURSE_CATEGORIES}
              onItemPress={item =>
                navigation.navigate('Results', {
                  title: `${item.title} Courses`
                })
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
    data: state.event.listData,
    fetching: state.event.fetching,
    lastCalledPage: state.event.lastCalledPage,
    listError: state.event.listError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventsList: (accessToken, pageNo) =>
      dispatch(EventActions.eventOnListRequest(accessToken, pageNo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
