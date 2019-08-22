import React from 'react'
import PropTypes from 'prop-types';
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormField, DatePicker, TimePicker, PhotoPicker } from '../ui'
import FormContainer from './FormContainer'

const initialValues = {
  org_name: '',
  event_name: '',
  details: '',
  venue: '',
  photos: [],
  req_time: '',
  req_date: '',
  opt_date: '',
  opt_time: '',
}

const validationSchema = yup.object().shape({
  event_name: yup.string().required('ಶೀರ್ಷಿಕೆ ಅಗತ್ಯವಿದೆ'),
  org_name: yup.string().required('ಸಂಘ ಸಂಸ್ಥೆ/ವ್ಯಕ್ತಿಯ ಹೆಸರು ಅಗತ್ಯವಿದೆ'),
  details: yup
    .string()
    .required('ವಿವರಗಳು  ಅಗತ್ಯವಿದೆ'),
  req_time: yup
    .string()
    .required('ಕೋರಿಕೆಯ ಸಮಯ  ಅಗತ್ಯವಿದೆ'),
  req_date: yup
    .date()
    .required('ಕೋರಿಕೆಯ ದಿನಾಂಕದ ಅಗತ್ಯವಿದೆ'),
  venue: yup
    .string()
    .required('ಸ್ಥಳ ಅಗತ್ಯವಿದೆ'),
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
            submitButtonText="ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಲ್ಲಿಸಿ"
            onSubmitButtonPress={() => props.handleSubmit()}
          >
            <FormField
              label="ಕಾರ್ಯಕ್ರಮ/ಸಮಾಯವಕಾಶದ ಹೆಸರು"
              value={props.values.event_name}
              onChangeText={text => props.setFieldValue('event_name', text)}
              error={props.touched.event_name && props.errors.event_name}
            />
            <FormField
              label="ಕಾರ್ಯಕ್ರಮ ನಡೆಯುವ ಸ್ಥಳ"
              value={props.values.venue}
              onChangeText={text => props.setFieldValue('venue', text)}
              error={props.touched.venue && props.errors.venue}
            />

            <FormField
              label="ಸಂಘ ಸಂಸ್ಥೆ/ವ್ಯಕ್ತಿಯ ಹೆಸರು"
              value={props.values.org_name}
              onChangeText={text => props.setFieldValue('org_name', text)}
              error={props.touched.org_name && props.errors.org_name}
            />

            <FormField
              label="ವಿವರಗಳು"
              value={props.values.details}
              onChangeText={text => props.setFieldValue('details', text)}
              error={props.touched.details && props.errors.details}
              multiline
              placeholder="ಕಾರ್ಯಕ್ರಮ ವಿವರಗಳು ವಿವರಿಸಿ"
            />
            <DatePicker
              label="ಕೋರಿಕೆಯ ದಿನಾಂಕ"
              defaultDate={props.values.req_date}
              onChange={value => props.setFieldValue('req_date', value)}
              error={props.touched.req_date && props.errors.req_date}
              placeholder={'ಕೋರಿಕೆಯ ದಿನಾಂಕ ಆಯ್ಕೆ ಮಾಡಿ'}
            />
            <TimePicker
              label="ಕೋರಿಕೆಯ ಸಮಯ"
              defaultDate={props.values.req_time}
              onChange={value => props.setFieldValue('req_time', value)}
              error={props.touched.req_time && props.errors.req_time}
              placeholder={'ಕೋರಿಕೆಯ ಸಮಯ ಆಯ್ಕೆ ಮಾಡಿ'}
            />
            <DatePicker
              label="ಪರ್ಯಾಯ ಕೋರಿಕೆಯ ದಿನಾಂಕ"
              defaultDate={props.values.opt_date}
              onChange={value => props.setFieldValue('opt_date', value)}
              error={props.touched.opt_date && props.errors.opt_date}
              placeholder={'ಪರ್ಯಾಯ ಕೋರಿಕೆಯ ದಿನಾಂಕ ಆಯ್ಕೆ ಮಾಡಿ'}
            />
            <TimePicker
              label="ಕೋರಿಕೆಯ ಸಮಯ"
              defaultDate={props.values.opt_time}
              onChange={value => props.setFieldValue('opt_time', value)}
              error={props.touched.opt_time && props.errors.opt_time}
              placeholder={'ಪರ್ಯಾಯ ಕೋರಿಕೆಯ ಸಮಯ ಆಯ್ಕೆ ಮಾಡಿ'}
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

