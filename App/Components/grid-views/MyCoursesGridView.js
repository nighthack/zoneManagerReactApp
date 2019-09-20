import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import MyCourseGridItem, {
  Wrapper as InvisibleGridViewItem
} from '../grid-items/MyCourseGridItem'
import { ListEmptyComponent } from '../ui'

const NUM_COLUMNS = 2
const GridView = styled.FlatList.attrs({
  numColumns: NUM_COLUMNS
})`
  flex: 1;
`

const Wrapper = styled.View`
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

export default function MyCoursesGridView({
  items,
  onItemPress,
  onItemDeletePress,
  onRefresh
}) {
  return (
    <Wrapper>
      {items.length === 0 && (
        <ListEmptyComponent
          showRefreshButton
          text="No courses to display."
          onRefreshButtonPress={() => onRefresh()}
        />
      )}

      {items.length > 0 && (
        <GridView
          data={formatGridViewData(items, NUM_COLUMNS)}
          keyExtractor={item => items.indexOf(item).toString()}
          renderItem={({ item }) => {
            if (item.empty === true) {
              return <InvisibleGridViewItem />
            } else {
              return (
                <MyCourseGridItem
                  {...item}
                  onPress={() => onItemPress(item)}
                  onDeletePress={() => onItemDeletePress(item)}
                />
              )
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Wrapper>
  )
}

MyCoursesGridView.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  onItemDeletePress: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
}
