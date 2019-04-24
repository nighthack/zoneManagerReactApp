import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['phone', 'password'],
  loginSuccess: ['token'],
  loginFailure: ['response'],
  otpRequest: ['phone'],
  otpSuccess: ['response'],
  otpFailure: ['response'],
  verifyOtp: ['phone', 'otp'],
  verifyOtpSuccess: ['response'],
  verifyOtpFailure: ['response'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  token: null,
  error: null,
  verifyOtpResponse: {},
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, { token }) => state.merge({ fetching: false, error: null, token })


// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })


// request the data from an api
export const getOTPrequest = (state, { otp, phone }) => state.merge({ fetching: true })


// successful api lookup
export const getOTPsuccess = (state, { response }) => state.merge({ fetching: false, otpMessage: response.message })

export const getOTPfailure = (state, { response }) => state.merge({ fetching: false, otpMessage: response.message })

// Something went wrong somewhere.
export const verifyOTPRequest = (state, { otp, phone }) =>
  state.merge({ fetching: true, verifyOTPapiStatus: 0, otpOptions: { otp, phone } })

export const verifyOTPsuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, verifyOtpResponse: response, verifyOTPapiStatus: 1 })
};

export const verifyOTPfailure = (state, { response }) => {
  return state.merge({ fetching: false, error: true, verifyOtpResponse: response, verifyOTPapiStatus: 2 })
}
  

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.OTP_REQUEST]: getOTPrequest,
  [Types.OTP_SUCCESS]: getOTPsuccess,
  [Types.OTP_FAILURE]: getOTPfailure,
  [Types.VERIFY_OTP]: verifyOTPRequest,
  [Types.VERIFY_OTP_SUCCESS]: verifyOTPsuccess,
  [Types.VERIFY_OTP_FAILURE]: verifyOTPfailure
})
