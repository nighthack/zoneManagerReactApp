import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { AvatarListItem } from '../list-items'

const Wrapper = styled.View`
  height: 150;
  padding: 0px 0px 16px;
`

export default function AvatarsListView({ items, onItemPress }) {
  return (
    <Wrapper>
      <FlatList
        horizontal
        style={{ flex: 1 }}
        data={items}
        keyExtractor={item => items.indexOf(item).toString()}
        renderItem={({ item }) => (
          <AvatarListItem {...item} onPress={() => onItemPress(item)} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Wrapper>
  )
}

AvatarsListView.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired
}
