import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { RecommendedListItem } from '../list-items'

const Wrapper = styled.View`
  height: 140;
  padding: 0px 0px 16px;
`

export default function RecommendedListView({ items, onItemPress }) {
  return (
    <Wrapper>
      <FlatList
        horizontal
        style={{ flex: 1 }}
        data={items}
        keyExtractor={item => items.indexOf(item).toString()}
        renderItem={({ item }) => (
          <RecommendedListItem {...item} onPress={() => onItemPress(item)} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Wrapper>
  )
}

RecommendedListView.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired
}
