import React from 'react'
import { Container, Content, Tabs, Tab, TabHeading } from 'native-base'
import styled from 'styled-components/native'
import {
  SafeAreaViewWrapper,
  CustomStatusBar,
  ImageProgressComponent,
  CoursePriceTag
} from './ui'
import { TabHeader } from './headers'
import { Title, SubHeading, DetailsWrapper } from './list-items/CourseListItem'
import { CourseLessonListItem } from './list-items'
import { defaultStackNavigatorHeaderStyle, tabHeaderStyle } from './Styles/DevDetailStyle'

const CourseContentWrapper = styled.View`
  padding: 16px;
`
const DescriptionText = styled.Text`
  font-size: 15;
  margin: 10px 0px 0px;
  line-height: 24;
`

const LessonText = styled(DescriptionText)`
  margin: 6px;
  line-height: 24;
`
const CourseTitle = styled.Text`
  width: 300;
  align-self: center;
  font-size: 25;
  text-align: center;
  margin-bottom: 16;
`

const CoursePriceWrapper = styled.View`
  align-self: center;
  margin-bottom: 16;
`

const InstructorProfileWrapper = styled.View`
  flex-direction: row;
  padding: 16px 0px;
  border-color: transparent;
  border-top-color: #dee3ea;
  border-width: 1;
`

const InstructorNameWrapper = styled.View`
  flex: 1;
  justify-content: center;
`

const InstructorRatingWrapper = styled.View`
  flex-direction: row;
`

const InstructorRating = styled.Text`
  align-self: center;
  font-size: 17;
  color: #f7bf00;
  margin-left: 4;
`
const Wrapper = styled.View`
  border-color: transparent;
  border-top-color: #dee3ea;
  border-width: 1;
`;

export const StatsWrapper = styled.View`
  height: 80;
  flex-direction: row;
`;

export const StatItemWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default class DevelopmentDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Course Details',
    headerBackTitle: null,
    ...defaultStackNavigatorHeaderStyle
  }

  state = {
    activeTab: 0
  }

  render() {
    const { activeTab } = this.state
    const { navigation, data } = this.props
    const { title, images, subTitle, desc, metaData, lastUpdatedAt, createdDate } = data;
    return (
      <SafeAreaViewWrapper>
        <Container>
          <CustomStatusBar />

          <Tabs
            page={activeTab}
            tabBarUnderlineStyle={{ width: null, height: null }}
            onChangeTab={({ i }) => this.setState({ activeTab: i })}
          >
            <Tab
              heading={
                <TabHeading style={tabHeaderStyle}>
                  <TabHeader title="ವಿವರಗಳು" active={activeTab === 0} />
                </TabHeading>
              }
            >
              <Content>
                {
                  images && images.length ?
                  <ImageProgressComponent
                    photoURL={images[0]}
                    resizeMode="cover"
                    style={{ flex: 1, width: null, height: 200 }}
                  /> : null
                }
                <CourseContentWrapper>
                  <CourseTitle>{title}</CourseTitle>
                  {
                    subTitle ?
                      <CoursePriceWrapper>
                        <CoursePriceTag price={subTitle} />
                      </CoursePriceWrapper> : null
                  }
                  <StatsWrapper>
                    <StatItemWrapper>
                      <Title>{createdDate}</Title>
                      <SubHeading style={{fontSize: 10}}>ಸೇರಿಸಲಾಗಿದ ದಿನಾಂಕ</SubHeading>
                    </StatItemWrapper>

                    <StatItemWrapper>
                      <Title>{lastUpdatedAt}</Title>
                      <SubHeading style={{fontSize: 10}}>ಕೊನೆಯ ನವೀಕರಿಸಿದ ದಿನಾಂಕ</SubHeading>
                    </StatItemWrapper>
                  </StatsWrapper>
                  <InstructorProfileWrapper>
                    <InstructorNameWrapper>
                      <SubHeading>ವಿವರಗಳು</SubHeading>
                      <DescriptionText>{desc}</DescriptionText>
                    </InstructorNameWrapper>
                  </InstructorProfileWrapper>
                  <Wrapper>
                    {metaData.map((item, index) => (
                      <CourseLessonListItem
                        key={index}
                        number={index + 1}
                        {...item}
                        onPress={() => onItemPress(item)}
                      />
                    ))}
                  </Wrapper>
                </CourseContentWrapper>
              </Content>
            </Tab>
            {
              images && images.length ?
                <Tab
                  heading={
                    <TabHeading style={tabHeaderStyle}>
                      <TabHeader title="ಚಿತ್ರಗಳು" active={activeTab === 1} />
                    </TabHeading>
                  }
                >
                <Content>
                  {
                    images.map((image) => (<ImageProgressComponent
                      photoURL={image}
                      resizeMode="cover"
                      style={{ flex: 1, width: null, height: 200 }}
                    />))
                  }
                </Content>
                </Tab> : null
            }

          </Tabs>
        </Container>
      </SafeAreaViewWrapper>
    )
  }
}
