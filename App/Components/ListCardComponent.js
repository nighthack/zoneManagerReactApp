import React from 'react'
import PropTypes from 'prop-types';
import { Card, View, Text } from 'native-base'
import styled from 'styled-components/native'
import { ImageProgressComponent } from './ui'
import { CourseLessonListItem } from './list-items';

const Wrapper = styled(Card)`
  flex-direction: column;
  padding: 16px;
  margin-top: 16;
  border-top-color: #f4f6fa;
  border-radius: 8;
`

const CourseTitle = styled.Text.attrs({
  numberOfLines: 2
})`
  font-size: 15;
  margin-top: 8;
`

const PricesWrapper = styled.View`
  flex-direction: row;
`

const DetailsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const DetailsItem = styled.View`
  width: 50%;
  text-align: right;
`;

const SellingPrice = styled.Text`
  font-size: 15;
  margin-top: 4;
`

const OriginalPrice = styled(SellingPrice)`

  color: #8a8a8f;
  text-decoration: line-through;
  margin-left: 8;
`

export default function ListCardComponent({
  title,
  image,
  onPress,
  subTitle,
  metaData,
}) {
  return (
    <Wrapper>
      {
        image ?
        <ImageProgressComponent
          photoURL={image}
          resizeMode="cover"
          style={{ flex: 1, width: null, height: 180 }}
        /> : null
      }
      <CourseTitle>{title}</CourseTitle>
      <PricesWrapper>
        <SellingPrice>{subTitle}</SellingPrice>
      </PricesWrapper>
      <DetailsWrapper>
        {metaData.map((item, index) => (
          <DetailsItem>
            <CourseLessonListItem
              position={index  % 2 ? 'left' : 'right'}
              key={index}
              number={index + 1}
              {...item}
            />
          </DetailsItem>
          ))}
      </DetailsWrapper>

    </Wrapper>
  )
}

ListCardComponent.propTypes = {
  title: PropTypes.string,

}
