import React from 'react'
import PropTypes from 'prop-types';
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField, SelectField, DatePicker } from '../ui'
import FormContainer from './FormContainer'

const validationSchema = yup.object().shape({
  first_name: yup.string().required('ಮೊದಲ ಹೆಸರು ಅಗತ್ಯವಿದೆ'),
  last_name: yup.string().required('ಕೊನೆಯ ಹೆಸರು ಅಗತ್ಯವಿದೆ'),
  email: yup
    .string()
    .required('ಇಮೇಲ್  ಅಗತ್ಯವಿದೆ')
    .email('ಮಾನ್ಯವಾದ ಇಮೇಲ್ ನಮೂದಿಸಿ'),
  dob: yup
    .date()
    .required('ಹುಟ್ಟಿದ ದಿನಾಂಕದ ಅಗತ್ಯವಿದೆ'),
  gender: yup
    .string()
    .required('ಲಿಂಗ  ಅಗತ್ಯವಿದೆ')
})

export default function EditProfileForm({ loading, onSubmit, initialValues }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
      render={props => (
        <FormContainer
          loading={loading}
          submitButtonText="ನವೀಕರಿಸಿ"
          onSubmitButtonPress={() => props.handleSubmit()}
        >
          <FormField
            label="ಮೊದಲ ಹೆಸರು"
            value={props.values.first_name}
            onChangeText={text => props.setFieldValue('first_name', text)}
            error={props.touched.first_name && props.errors.first_name}
          />

          <FormField
            label="ಕೊನೆಯ ಹೆಸರು"
            value={props.values.last_name}
            onChangeText={text => props.setFieldValue('last_name', text)}
            error={props.touched.last_name && props.errors.last_name}
          />

          <FormField
            label="ಇಮೇಲ್"
            keyboardType="email-address"
            value={props.values.email}
            onChangeText={text => props.setFieldValue('email', text)}
            error={props.touched.email && props.errors.email}
          />

          <SelectField
            label="ಲಿಂಗ"
            value={props.values.gender}
            onChange={value => props.setFieldValue('gender', value)}
            error={props.touched.gender && props.errors.gender}
            placeholder={'ಲಿಂಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ'}
            options={[{ name: 'ಗಂಡು', value: 'ಗಂಡು' }, { name: 'ಹೆಣ್ಣು ', value: 'ಹೆಣ್ಣು' }, { name: 'ಇತರೆ', value: 'ಇತರೆ' }]}
          />

          <DatePicker
            label="ಹುಟ್ಟಿದ ದಿನಾಂಕ"
            defaultDate={props.values.dob}
            onChange={value => props.setFieldValue('dob', value)}
            error={props.touched.dob && props.errors.dob}
            placeholder={'ಹುಟ್ಟಿದ ದಿನಾಂಕ ಆಯ್ಕೆ ಮಾಡಿ'}
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

// <FormField
//   label="ಪಿನ್ಕೋಡ್"
//   keyboardType="numeric"
//   value={props.values.pincode}
//   onChangeText={text => props.setFieldValue('pincode', text)}
//   error={props.touched.pincode && props.errors.pincode}
// />


// <FormField
// label="ಫೋನ್ ನಂಬರ್"
// keyboardType="phone-pad"
// value={props.values.phone}
// onChangeText={text => props.setFieldValue('phone', text)}
// error={props.touched.phone && props.errors.phone}
// />

