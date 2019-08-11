import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-navigation'
import { safeAreaViewStyle } from '../../styles/common'

export default function SafeAreaViewWrapper({ children, extraStyles }) {
  return (
    <SafeAreaView style={{ ...safeAreaViewStyle, ...extraStyles }}>
      {children}
    </SafeAreaView>
  )
}

SafeAreaView.propTypes = {
  children: PropTypes.node.isRequired,
  extraStyles: PropTypes.object
}
