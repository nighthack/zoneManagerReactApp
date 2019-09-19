import React from 'react'
import PropTypes from 'prop-types';
import { Formik } from 'formik'
import * as yup from 'yup'
import { PanchayatPicker, CustomActivityIndicator, LinkButton } from '../ui'
import FormContainer from './FormContainer'

const initialValues = {
  panchayat_id: '',
  panchayat_name: '',
}

const validationSchema = yup.object().shape({
  panchayat_id: yup
    .number()
    .required('ಪಂಚಾಯತ್ ಅಗತ್ಯವಿದೆ'),
})

export default function DevWorksFilter({ loading, onSubmit, onCancel, panchayat_id, onClearFilter }) {
  const tempInitialValues = { ...initialValues, panchayat_id };

  return (
    <Formik
      initialValues={tempInitialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values)
      }}
      render={props => {
        return (
          <FormContainer
            loading={loading}
            submitButtonText="ಫಿಲ್ಟರ್"
            onSubmitButtonPress={() => props.handleSubmit()}
            showCancel
            onCancelButtonPress={() => {
              props.resetForm();
              onCancel();
            }}
          >
            <PanchayatPicker
              label="ಪಂಚಾಯತ್ ಆಯ್ಕೆ ಮಾಡಿ"
              value={props.values.panchayat_id}
              onChange={(place_id, panchayat_name) => {
                props.setFieldValue('panchayat_id', place_id)
                props.setFieldValue('panchayat_name', panchayat_name)
              }}
              error={props.touched.panchayat_id && props.errors.panchayat_id}
            />
            {
              panchayat_id ? <LinkButton
                text="ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ"
                onPress={() => onClearFilter()}
              /> : null
            }
          </FormContainer>
        )
      }}
    />
  )
}

DevWorksFilter.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}