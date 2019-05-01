import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Footer } from 'native-base'
import styles from './Styles/ListFooterStyle'

export default class ListFooter extends Component {

  render() {
    const { goToFirstPage, goToNextPage, goToPrevPage, data, currentPage, refreshPage } = this.props;
    return (
      <Footer style={styles.container}>
        <View style={styles.smn}>
          <TouchableOpacity
            style={currentPage === 1 ? [styles.smnBtn, { opacity: 0.3 }] : styles.smnBtn}
            disabled={currentPage === 1}
            onPress={() => {
              goToPrevPage()
            }}>
            <Icon name='arrow-left' type="FontAwesome" style={styles.smnIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smnBtn, { backgroundColor: '#ffd328' }]} onPress={() => {
            refreshPage()
          }}>
            <Text style={[styles.smnText, { color: '#393f4a', fontWeight: 'bold', fontSize: 14 }]}>Page {currentPage}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={data.length < 10 ? [styles.smnBtn, { opacity: 0.3 }] : styles.smnBtn}
            disabled={data.length < 10}
            onPress={() => {
              goToNextPage()
            }}>
            <Icon name='arrow-right' type="FontAwesome" style={styles.smnIcon} />
          </TouchableOpacity>
        </View>
      </Footer>
    )
  }
}
