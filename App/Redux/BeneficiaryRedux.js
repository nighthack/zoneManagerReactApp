import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  beneficiaryRequest: ['accessToken'],
  beneficiarySuccess: ['response'],
  beneficiaryFailure: null
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
})

/* ------------- Selectors ------------- */

export const BeneficiarySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state ) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { response } = action
  return state.merge({ fetching: false, error: null, beneficiaryList:response })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BENEFICIARY_REQUEST]: request,
  [Types.BENEFICIARY_SUCCESS]: success,
  [Types.BENEFICIARY_FAILURE]: failure
})
