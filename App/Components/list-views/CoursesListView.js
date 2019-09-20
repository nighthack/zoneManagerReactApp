import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { ListLoadingComponent, ListEmptyComponent } from '../ui'
import { CourseListItem } from '../list-items'

export const Wrapper = styled.View`
  flex: 1;
  padding: 0px 16px;
`

export default class CoursesListView extends React.Component {
  state = {
    refreshing: false
  }

  onListRefresh() {
    this.setState({ refreshing: true })

    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 2000)
  }

  render() {
    const {
      loading,
      items,
      allowItemSave,
      onItemPress,
      onItemSavePress,
      onRefresh
    } = this.props
    const { refreshing } = this.state

    return (
      <Wrapper>
        {loading && <ListLoadingComponent text="Loading courses" />}

        {!loading && items.length === 0 && (
          <ListEmptyComponent
            showRefreshButton
            text="No courses to display."
            onRefreshButtonPress={() => onRefresh()}
          />
        )}

        {!loading && items.length > 0 && (
          <FlatList
            style={{ flex: 1 }}
            data={items}
            keyExtractor={item => items.indexOf(item).toString()}
            renderItem={({ item }) => (
              <CourseListItem
                {...item}
                allowSave={allowItemSave}
                onPress={() => onItemPress(item)}
                onSavePress={() => onItemSavePress(item)}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this.onListRefresh()}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </Wrapper>
    )
  }
}

CoursesListView.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  allowItemSave: PropTypes.bool,
  onItemPress: PropTypes.func.isRequired,
  onItemSavePress: PropTypes.func,
  onRefresh: PropTypes.func
}
CoursesListView.defaultProps = {
  allowItemSave: true,
  onItemSavePress: () => null,
  onRefresh: () => null
}
