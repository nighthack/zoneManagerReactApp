import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // Login Actions
  loginRequest: ['phone', 'password'],
  loginSuccess: ['user', 'message'],
  loginFailure: ['response'],
  resetStateOnNavigation: ['payload'],
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

  // Reset Password Actions
  resetPasswordRequest: ['data'],
  resetPasswordSuccess: ['response'],
  resetPasswordFailure: ['response'],

  logoutRequest: ['accessToken'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  user: null,
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
export const success = (state, { user, message }) => { 
  if(user) {
    return state.merge({ fetching: false, error: null, user: user })    
  } else {
    return state.merge({ fetching: false, error: true, user: null })  
  }
}


// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const changeStateOnNavigation = state =>
  state.merge({ fetching: null, error: null })

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

export const onResetPassword = (state) => state.merge({ fetching: true, resetPasswordApiStatus: 0 })

// successful api lookup
export const onResetPasswordsuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, user: response, resetPasswordApiStatus: 1 })
}
// Something went wrong somewhere.
export const onResetPasswordfailure = state =>
  state.merge({ fetching: false, error: true, resetPasswordApiStatus: 2 })

export const onLogout = state =>
  state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.RESET_STATE_ON_NAVIGATION]: changeStateOnNavigation,
  [Types.OTP_REQUEST]: getOTPrequest,
  [Types.OTP_SUCCESS]: getOTPsuccess,
  [Types.OTP_FAILURE]: getOTPfailure,
  [Types.VERIFY_OTP]: verifyOTPRequest,
  [Types.VERIFY_OTP_SUCCESS]: verifyOTPsuccess,
  [Types.VERIFY_OTP_FAILURE]: verifyOTPfailure,
  [Types.SIGNUP_REQUEST]: onSignUp,
  [Types.SIGNUP_SUCCESS]: onSignUpsuccess,
  [Types.SIGNUP_FAILURE]: onSignUpfailure,
  [Types.RESET_PASSWORD_REQUEST]: onResetPassword,
  [Types.RESET_PASSWORD_SUCCESS]: onResetPasswordsuccess,
  [Types.RESET_PASSWORD_FAILURE]: onResetPasswordfailure,
  [Types.LOGOUT_REQUEST]: onLogout,
})
