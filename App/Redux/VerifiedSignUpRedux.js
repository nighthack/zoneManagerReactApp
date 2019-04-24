import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getPositions: ['payload'],
  getPositionSuccess: ['positions'],
  getPositionFail: ['response'],
  signupRequest: ['data'],
  signupSuccess: ['response'],
  signupFailure: ['response'],
})

export const VerifiedSignUpTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  singupResponse: {},
})

/* ------------- Selectors ------------- */

export const VerifiedSignUpSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { positions } = action
  return state.merge({ fetching: false, error: null, positions })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const onSignUp = (state) => state.merge({ fetching: true, signupApiStatus: 0 })
  

// successful api lookup
export const onSignUpsuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, singupResponse: response, signupApiStatus: 1  })
}

// Something went wrong somewhere.
export const onSignUpfailure = state =>
  state.merge({ fetching: false, error: true, signupApiStatus: 2 })


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POSITIONS]: request,
  [Types.GET_POSITION_SUCCESS]: success,
  [Types.GET_POSITION_FAIL]: failure,
  [Types.SIGNUP_REQUEST]: onSignUp,
  [Types.SIGNUP_SUCCESS]: onSignUpsuccess,
  [Types.SIGNUP_FAILURE]: onSignUpfailure,
})
