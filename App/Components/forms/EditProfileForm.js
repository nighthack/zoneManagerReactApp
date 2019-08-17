import React from 'react'
import PropTypes from 'prop-types';
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField, SelectField } from '../ui'
import FormContainer from './FormContainer'



const validationSchema = yup.object().shape({
  fullName: yup.string().required('full name is required'),
  email: yup
    .string()
    .required('email address is required')
    .email('enter a valid email address'),
  password: yup.string().required('password is required')
})

export default function EditProfileForm({ loading, onSubmit, initialValues }) {
  console.log(initialValues)
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
            label="ಮೊದಲ ಹೆಸರು"
            value={props.values.name}
            onChangeText={text => props.setFieldValue('name', text)}
            error={props.touched.name && props.errors.name}
          />

          <FormField
            label="ಕೊನೆಯ ಹೆಸರು"
            value={props.values.name}
            onChangeText={text => props.setFieldValue('name', text)}
            error={props.touched.name && props.errors.name}
          />

          <FormField
            label="ಇಮೇಲ್"
            keyboardType="email-address"
            value={props.values.email}
            onChangeText={text => props.setFieldValue('email', text)}
            error={props.touched.email && props.errors.email}
          />

          <FormField
            label="ಫೋನ್ ನಂಬರ್"
            keyboardType="phone-pad"
            value={props.values.phone}
            onChangeText={text => props.setFieldValue('phone', text)}
            error={props.touched.phone && props.errors.phone}
          />

          <FormField
            label="ಪಿನ್ಕೋಡ್"
            keyboardType="numeric"
            value={props.values.pincode}
            onChangeText={text => props.setFieldValue('pincode', text)}
            error={props.touched.pincode && props.errors.pincode}
          />

          <SelectField
            label="ಲಿಂಗ"
            keyboardType="numeric"
            value={props.values.gender}
            onChangeText={text => props.setFieldValue('gender', text)}
            error={props.touched.gender && props.errors.gender}
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


// <FormField
// label="Password"
// secure
// value={props.values.password}
// onChangeText={text => props.setFieldValue('password', text)}
// error={props.touched.password && props.errors.password}
// />