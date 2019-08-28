import React from 'react'
import PropTypes from 'prop-types';
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField, PlacePicker, StatusPicker, PhotoPicker } from '../ui'
import FormContainer from './FormContainer'

const initialValues = {
  name: '',
  details: '',
  feedback_type: '',
  place_id: '',
  photos: [],
}

const validationSchema = yup.object().shape({
  name: yup.string().required('ಶೀರ್ಷಿಕೆ ಅಗತ್ಯವಿದೆ'),
  details: yup
    .string()
    .required('ವಿವರಗಳು  ಅಗತ್ಯವಿದೆ'),
  place_id: yup
    .number()
    .required('ಸ್ಥಳ ಅಗತ್ಯವಿದೆ'),
  feedback_type: yup
    .string()
    .required('ವಿಧ ಅಗತ್ಯವಿದೆ'),
})

export default function FeedbackCreateForm({ loading, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values)
        resetForm();
      }}
      render={props => {
        return (
          <FormContainer
            loading={loading}
            submitButtonText="ಸಲ್ಲಿಸಿ"
            onSubmitButtonPress={() => props.handleSubmit()}
          >
            <FormField
              label="ಶೀರ್ಷಿಕೆ"
              value={props.values.name}
              onChangeText={text => props.setFieldValue('name', text)}
              error={props.touched.name && props.errors.name}
            />

            <FormField
              label="ವಿವರಗಳು"
              value={props.values.details}
              onChangeText={text => props.setFieldValue('details', text)}
              error={props.touched.details && props.errors.details}
              multiline
              placeholder="ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ ಬಗ್ಗೆ ವಿವರವಾಗಿ ವಿವರಿಸಿ"
            />

            <PlacePicker
              label="ಸ್ಥಳವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ"
              value={props.values.place_id}
              onChange={({ id }) => props.setFieldValue('place_id', id)}
              error={props.touched.place_id && props.errors.place_id}
            />

            <StatusPicker
              label="ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ ವಿಧ"
              value={props.values.feedback_type}
              onChange={value => props.setFieldValue('feedback_type', value)}
              error={props.touched.feedback_type && props.errors.feedback_type}
              placeholder={'ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ ವಿಧ ಆಯ್ಕೆ ಮಾಡಿ'}
            />
            <PhotoPicker
              label="ಫೋಟೋಗಳನ್ನು ಸೇರಿಸಿ"
              onChange={value => props.setFieldValue('photos', value)}
            />
          </FormContainer>
        )
      }}
    />
  )
}

FeedbackCreateForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
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

