import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'native-base'
import { Bar } from 'react-native-progress'
import styled from 'styled-components/native'
import { ImageProgressComponent } from '../ui'
import { Title, SubHeading } from '../list-items/CourseListItem'

export const Wrapper = styled.View`
  flex: 1;
`

const CourseCard = styled(Card)`
  flex: 1;
  height: 170;
  padding: 8px;
  margin: 16px;
  border-top-color: #f4f6fa;
  border-radius: 8;
`

const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12;
`

const ButtonContent = styled.TouchableOpacity`
  flex: 1;
`

const ProgressBarWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`

const ProgressBar = styled(Bar).attrs({
  width: null,
  height: 4,
  borderRadius: 8,
  borderColor: 'transparent',
  animated: false,
  color: '#32ce89',
  unfilledColor: '#dee3ea'
})`
  align-self: stretch;
`

export default function MyCourseGridItem({
  photoURL,
  title,
  length,
  progress,
  onPress,
  onDeletePress
}) {
  return (
    <Wrapper>
      <CourseCard>
        <Top>
          <ImageProgressComponent
            photoURL={photoURL}
            resizeMode="cover"
            style={{ width: 50, height: 50, marginRight: 16 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </Top>

        <ButtonContent onPress={() => onPress()}>
          <Title numberOfLines={2}>{title}</Title>
          <SubHeading>{length} hours</SubHeading>

          <ProgressBarWrapper>
            <ProgressBar progress={progress / 10} />
          </ProgressBarWrapper>
        </ButtonContent>
      </CourseCard>
    </Wrapper>
  )
}

MyCourseGridItem.propTypes = {
  photoURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  onDeletePress: PropTypes.func.isRequired
}
