import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField, RegularButton, CustomActivityIndicator } from '../ui'
import { ActionText } from './FormContainer'

const Wrapper = styled.View`
  padding: 16px;
`

const profilePhotoDimensions = 100
const ProfilePhoto = styled.Image.attrs({
  source: { uri: 'https://imgur.com/oqgs8nX.png' }
})`
  width: ${profilePhotoDimensions};
  height: ${profilePhotoDimensions};
  border-radius: ${profilePhotoDimensions / 2};
  border-width: 5;
  border-color: #fff;
  align-self: center;
  margin-bottom: 16;
`

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('email address is required')
    .email('enter a valid email address'),
  password: yup.string().required('password is required')
})

export default function SignInForm({ loading, onSubmit, onSignUpPress }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
      render={props => (
        <KeyboardAwareScrollView enableOnAndroid>
          <Wrapper>
            <ProfilePhoto />

            <FormField
              label="Email"
              keyboardType="email-address"
              value={props.values.email}
              onChangeText={text => props.setFieldValue('email', text)}
              error={props.touched.email && props.errors.email}
            />

            <FormField
              label="Password"
              secure
              value={props.values.password}
              onChangeText={text => props.setFieldValue('password', text)}
              error={props.touched.password && props.errors.password}
            />

            <RegularButton text="Log In" onPress={() => props.handleSubmit()} />

            <ActionText onPress={() => onSignUpPress()}>
              Don't have an account? Sign up
            </ActionText>

            {loading && <CustomActivityIndicator />}
          </Wrapper>
        </KeyboardAwareScrollView>
      )}
    />
  )
}

SignInForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired
}
