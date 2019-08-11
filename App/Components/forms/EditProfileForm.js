import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField } from '../ui'
import FormContainer from './FormContainer'

const initialValues = {
  fullName: 'Monique Verdugo',
  email: 'moniqueverdugo@mail.com',
  password: ''
}

const validationSchema = yup.object().shape({
  fullName: yup.string().required('full name is required'),
  email: yup
    .string()
    .required('email address is required')
    .email('enter a valid email address'),
  password: yup.string().required('password is required')
})

export default function EditProfileForm({ loading, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
      render={props => (
        <FormContainer
          loading={loading}
          submitButtonText="Update Profile"
          onSubmitButtonPress={() => props.handleSubmit()}
        >
          <FormField
            label="Your Name"
            value={props.values.fullName}
            onChangeText={text => props.setFieldValue('fullName', text)}
            error={props.touched.fullName && props.errors.fullName}
          />

          <FormField
            disabled
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
        </FormContainer>
      )}
    />
  )
}

EditProfileForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}
