import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { ReviewListItem } from '../list-items'
import { Wrapper } from './CoursesListView'

export default function ReviewsListView({ items }) {
  return (
    <Wrapper>
      <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={item => items.indexOf(item).toString()}
        renderItem={({ item }) => <ReviewListItem {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  )
}

ReviewsListView.propTypes = {
  items: PropTypes.array.isRequired
}
