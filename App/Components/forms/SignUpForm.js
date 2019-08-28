import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField, SelectField, DatePicker, PlacePicker } from '../ui'
import FormContainer from './FormContainer'


const initialValues = {
  first_name: '',
  last_name: '',
  gender: '',
  dob: '',
  position_id: '',
  place_id: '',
  phone: '',
  password: '',
  password_confirmation: '',

}

const phoneRegExp = /^[6-9]\d{9}$/;

const validationSchema = yup.object().shape({
  first_name: yup.string().required('ಮೊದಲ ಹೆಸರು ಅಗತ್ಯವಿದೆ'),
  last_name: yup.string().required('ಕೊನೆಯ ಹೆಸರು ಅಗತ್ಯವಿದೆ'),
  dob: yup
    .date()
    .required('ಹುಟ್ಟಿದ ದಿನಾಂಕದ ಅಗತ್ಯವಿದೆ')
    .max(new Date(), `ಹುಟ್ಟಿದ ದಿನಾಂಕ ಅಮಾನ್ಯವಾಗಿದೆ`),
  gender: yup
    .string()
    .required('ಲಿಂಗ  ಅಗತ್ಯವಿದೆ'),
  position_id: yup
    .string()
    .required('ಉದ್ಯೋಗ/ಹುದ್ದೆ ಅಗತ್ಯವಿದೆ'),
  place_id: yup
    .string()
    .required('ಸ್ಥಳ ಅಗತ್ಯವಿದೆ'),
  phone: yup
    .string().matches(phoneRegExp, 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಮಾನ್ಯವಾಗಿದೆ')
    .required('ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ'),
  password: yup.
    string()
    .required('ಪಾಸ್ವರ್ಡ್ ಅಗತ್ಯವಿದೆ'),
  password_confirmation: yup
    .string()
    .required('ದೃಢೀಕರಣ ಪಾಸ್ವರ್ಡ್ ಅಗತ್ಯವಿದೆ')
    .oneOf([yup.ref('password'), null], 'ಪಾಸ್ವರ್ಡ್ಗಳು ಒಂದೇ ಆಗಿರಬೇಕು')
})


export default function SignUpForm({ loading, onSubmit, positions }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
      render={props => (
        <FormContainer
          loading={loading}
          submitButtonText='ಒಟಿಪಿ ಪಡೆಯಿರಿ'
          // actionText="By pressing 'Join Us', you agree to our terms & conditions"
          showLinkButton
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
            label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
            keyboardType="phone-pad"
            value={props.values.phone}
            onChangeText={text => props.setFieldValue('phone', text)}
            error={props.touched.phone && props.errors.phone}
          />
          <FormField
            label="ಇಮೇಲ್"
            keyboardType="email-address"
            value={props.values.email}
            onChangeText={text => props.setFieldValue('email', text)}
            error={props.touched.email && props.errors.email}
          />

          <PlacePicker
            label="ಸ್ಥಳವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ"
            value={props.values.place_id}
            onChange={({ id }) => props.setFieldValue('place_id', id)}
            error={props.touched.place_id && props.errors.place_id}
          />

          <SelectField
            label="ಲಿಂಗ"
            value={props.values.gender}
            onChange={value => props.setFieldValue('gender', value)}
            error={props.touched.gender && props.errors.gender}
            placeholder={'ಲಿಂಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ'}
            options={[{ name: 'ಗಂಡು', value: 'ಗಂಡು' }, { name: 'ಹೆಣ್ಣು ', value: 'ಹೆಣ್ಣು' }, { name: 'ಇತರೆ', value: 'ಇತರೆ' }]}
          />

          <SelectField
            label="ಉದ್ಯೋಗ/ಹುದ್ದೆ ಆಯ್ಕೆ ಮಾಡಿ"
            value={props.values.position_id}
            onChange={value => props.setFieldValue('position_id', value)}
            error={props.touched.position_id && props.errors.position_id}
            placeholder={'ಉದ್ಯೋಗ/ಹುದ್ದೆ ಆಯ್ಕೆ ಮಾಡಿ'}
            options={positions}
          />

          <DatePicker
            label="ಹುಟ್ಟಿದ ದಿನಾಂಕ"
            defaultDate={props.values.dob}
            onChange={value => props.setFieldValue('dob', value)}
            error={props.touched.dob && props.errors.dob}
            placeholder={'ಹುಟ್ಟಿದ ದಿನಾಂಕ ಆಯ್ಕೆ ಮಾಡಿ'}
          />
          <FormField
            label="ಪಾಸ್ವರ್ಡ್"
            secureTextEntry
            value={props.values.password}
            onChangeText={text => props.setFieldValue('password', text)}
            error={props.touched.password && props.errors.password}
          />
          <FormField
            label="ಪಾಸ್ವರ್ಡ್ ದೃಢೀಕರಣ"
            secureTextEntry
            value={props.values.password_confirmation}
            onChangeText={text => props.setFieldValue('password_confirmation', text)}
            error={props.touched.password_confirmation && props.errors.password_confirmation}
          />
        </FormContainer>
      )}
    />
  )
}

SignUpForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
}
