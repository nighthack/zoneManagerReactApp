import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

const Line = styled.View`
  height: ${StyleSheet.hairlineWidth * 2};
  background-color: #dee3ea;
`

export default function Separator() {
  return <Line />
}
