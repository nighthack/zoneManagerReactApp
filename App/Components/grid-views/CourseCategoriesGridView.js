import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import CourseCategoryGridItem, {
  Wrapper as InvisibleGridViewItem
} from '../grid-items/CourseCategoryGridItem'

const NUM_COLUMNS = 3
const GridView = styled.FlatList.attrs({
  numColumns: NUM_COLUMNS
})`
  flex: 1;
`
function formatGridViewData(data, numColumns) {
  const numberOfFullRows = Math.floor(data.length / numColumns)

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
    numberOfElementsLastRow++
  }

  return data
}

export default function CourseCategoriesGridView({ items, onItemPress }) {
  return (
    <GridView
      data={formatGridViewData(items, NUM_COLUMNS)}
      keyExtractor={item => items.indexOf(item).toString()}
      renderItem={({ item }) => {
        if (item.empty === true) {
          return <InvisibleGridViewItem />
        } else {
          return (
            <CourseCategoryGridItem
              {...item}
              onPress={() => onItemPress(item)}
            />
          )
        }
      }}
    />
  )
}

CourseCategoriesGridView.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired
}
