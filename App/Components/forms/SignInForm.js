import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField, RegularButton, CustomActivityIndicator } from '../ui'
import { ActionText } from './FormContainer'
import { Images } from '../../Themes'

const Wrapper = styled.View`
  padding: 16px;
`

const profilePhotoDimensions = 100
const ProfilePhoto = styled.Image.attrs({
  source: Images.sunil,
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
  phone: '',
  password: ''
}

const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .required('ಫೋನ್ ನಂಬರ್ ಅಗತ್ಯವಿದೆ'),
  password: yup.string().required(' ಪಾಸ್ವರ್ಡ್ ಅಗತ್ಯವಿದೆ')
})

export default function SignInForm({ loading, onSubmit, onSignUpPress, onForgotPasswordPress }) {
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
              label="ಫೋನ್ ನಂಬರ್"
              keyboardType="phone-pad"
              value={props.values.phone}
              onChangeText={text => props.setFieldValue('phone', text)}
              error={props.touched.phone && props.errors.phone}
            />

            <FormField
              label="ಪಾಸ್ವರ್ಡ್"
              secure
              value={props.values.password}
              onChangeText={text => props.setFieldValue('password', text)}
              error={props.touched.password && props.errors.password}
            />

            <RegularButton text="ಲಾಗಿನ್" onPress={() => props.handleSubmit()} />

            <ActionText onPress={() => onSignUpPress()}>
              ಖಾತೆ ಇಲ್ಲವೇ? ಸೈನ್ ಅಪ್ ಮಾಡಿ
            </ActionText>
            <ActionText onPress={() => onForgotPasswordPress()}>
              ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?
            </ActionText>

            {loading && <CustomActivityIndicator />}
          </Wrapper>
        </KeyboardAwareScrollView>
      )}
    />
  )
}

SignInForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired
}
