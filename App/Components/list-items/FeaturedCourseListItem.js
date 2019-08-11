import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ImageProgressComponent } from '../ui'

const Wrapper = styled.TouchableOpacity`
  width: 200;
  margin-left: 16;
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

const SellingPrice = styled.Text`
   
  font-size: 15;
  margin-top: 4;
`

const OriginalPrice = styled(SellingPrice)`
 
  color: #8a8a8f;
  text-decoration: line-through;
  margin-left: 8;
`

export default function FeaturedCourseListItem({
  title,
  price,
  originalPrice,
  photoURL,
  onPress
}) {
  return (
    <Wrapper onPress={() => onPress()}>
      <ImageProgressComponent
        photoURL={photoURL}
        resizeMode="cover"
        style={{ width: 200, height: 150 }}
        imageStyle={{ borderRadius: 8 }}
      />

      <CourseTitle>{title}</CourseTitle>
      <PricesWrapper>
        <SellingPrice>{price}</SellingPrice>
        {!!originalPrice && <OriginalPrice>{originalPrice}</OriginalPrice>}
      </PricesWrapper>
    </Wrapper>
  )
}

FeaturedCourseListItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  originalPrice: PropTypes.string,
  photoURL: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
