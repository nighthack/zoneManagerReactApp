import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // Login Actions
  loginRequest: ['phone', 'password'],
  loginSuccess: ['token'],
  loginFailure: ['response'],
  // GET OTP Actions
  otpRequest: ['phone'],
  otpSuccess: ['response'],
  otpFailure: ['response'],
  // Verify OTP Actions
  verifyOtp: ['phone', 'otp'],
  verifyOtpSuccess: ['response'],
  verifyOtpFailure: ['response'],
  // SignUp Actions
  signupRequest: ['data'],
  signupSuccess: ['response'],
  signupFailure: ['response'],

  logoutRequest: ['accessToken'],
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
export const success = (state, { token }) => state.merge({ fetching: false, error: null, user: token })


// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })


// request the data from an api
export const getOTPrequest = (state, { otp, phone }) => state.merge({ fetching: true, getOtpStatus: 0 })


// successful api lookup
export const getOTPsuccess = (state, { response }) => state.merge({ fetching: false, getOtpStatus: 1 })

export const getOTPfailure = (state, { response }) => state.merge({ fetching: false, getOtpStatus: 2 })

// Something went wrong somewhere.
export const verifyOTPRequest = (state, { otp, phone }) =>
  state.merge({ fetching: true, verifyOTPapiStatus: 0, otpOptions: { otp, phone } })

export const verifyOTPsuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, verifyOtpResponse: response, verifyOTPapiStatus: 1 })
};

export const verifyOTPfailure = (state, { response }) => {
  return state.merge({ fetching: false, error: true, verifyOtpResponse: response, verifyOTPapiStatus: 2 })
}

export const onSignUp = (state) => state.merge({ fetching: true, signupApiStatus: 0 })

// successful api lookup
export const onSignUpsuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, user: response, signupApiStatus: 1 })
}
// Something went wrong somewhere.
export const onSignUpfailure = state =>
  state.merge({ fetching: false, error: true, signupApiStatus: 2 })

export const onLogout = state =>
  state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.OTP_REQUEST]: getOTPrequest,
  [Types.OTP_SUCCESS]: getOTPsuccess,
  [Types.OTP_FAILURE]: getOTPfailure,
  [Types.VERIFY_OTP]: verifyOTPRequest,
  [Types.VERIFY_OTP_SUCCESS]: verifyOTPsuccess,
  [Types.VERIFY_OTP_FAILURE]: verifyOTPfailure,
  [Types.SIGNUP_REQUEST]: onSignUp,
  [Types.SIGNUP_SUCCESS]: onSignUpsuccess,
  [Types.SIGNUP_FAILURE]: onSignUpfailure,
  [Types.LOGOUT_REQUEST]: onLogout,
})
