import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  beneficiaryRequest: ['accessToken', 'pageNo'],
  beneficiarySuccess: ['response'],
  beneficiaryFailure: null,
  beneficiaryDetailsRequest: ['id', 'accessToken',],
  beneficiaryDetailsSuccess: ['response'],
  beneficiaryDetailsFailure: null
})

export const BeneficiaryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  beneficiaryList: [],
  beneficiaryDetails: {},
})

/* ------------- Selectors ------------- */

export const BeneficiarySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { response } = action;
  return state.merge({ fetching: false, error: null, beneficiaryList: state.beneficiaryList.concat(response) })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })


// request the data from an api
export const beneficiaryDetailrequest = (state) =>
  state.merge({ detailFetching: true })

// successful api lookup
export const beneficiaryDetailsuccess = (state, action) => {
  const { response } = action
  return state.merge({ detailFetching: false, detailError: null, beneficiaryDetails: response })
}

// Something went wrong somewhere.
export const beneficiaryDetailfailure = state =>
  state.merge({ detailFetching: false, detailError: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BENEFICIARY_REQUEST]: request,
  [Types.BENEFICIARY_SUCCESS]: success,
  [Types.BENEFICIARY_FAILURE]: failure,
  [Types.BENEFICIARY_DETAILS_REQUEST]: beneficiaryDetailrequest,
  [Types.BENEFICIARY_DETAILS_SUCCESS]: beneficiaryDetailsuccess,
  [Types.BENEFICIARY_DETAILS_FAILURE]: beneficiaryDetailfailure,
})
