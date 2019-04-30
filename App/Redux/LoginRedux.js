import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // Login Actions
  loginRequest: ['phone', 'password'],
  loginSuccess: ['user', 'message'],
  loginFailure: ['response'],
  resetStateOnNavigation: ['payload'],

// VERIFY USER
  verifyUser: ['phone'],
  verifyUserSuccess: ['payload'],
  verifyUserFail: ['payload'],
  // GET OTP Actions
  otpRequest: ['phone'],
  otpSuccess: ['response'],
  otpFailure: ['response'],
  // Verify OTP Actions
  // verifyOtp: ['phone', 'otp'],
  // verifyOtpSuccess: ['response'],
  // verifyOtpFailure: ['response'],
  // SignUp Actions
  signupRequest: ['data'],
  signupSuccess: ['response'],
  signupFailure: ['errors'],

  // Reset Password Actions
  resetPasswordRequest: ['data'],
  resetPasswordSuccess: ['response'],
  resetPasswordFailure: ['response'],

// Get Places List
  getPreLoginPlacesList: ['searchParam'],
  getPreLoginPlacesListSuccess: ['data'],
  getPreLoginPlacesListFail:['data'],

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
  placesList: [],
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data })

// successful api lookup
export const success = (state, { user }) => state.merge({ fetching: false, error: null, user })

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

export const changeStateOnNavigation = state =>
  state.merge(
    { 
      fetching: null,
      error: null, 
      getOtpStatus: null, 
      signupApiStatus: null, 
      resetPasswordApiStatus: null,
      resetPasswordError: null,
    })

// request the data from an api
export const getOTPrequest = (state, { otp, phone }) => state.merge({ fetching: true, getOtpStatus: 0 })


// successful api lookup
export const getOTPsuccess = (state, { response }) => state.merge({ fetching: false, getOtpStatus: 1 })

export const getOTPfailure = (state, { response }) => state.merge({ fetching: false, getOtpStatus: 2 })


export const onSignUp = (state) => state.merge({ fetching: true, signupApiStatus: 0 })

// successful api lookup
export const onSignUpsuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, user: response, signupApiStatus: 1 })
}
// Something went wrong somewhere.
export const onSignUpfailure = (state, { errors }) =>
  state.merge({ fetching: false, signupApiStatus: 2, signUpErrors: errors })

export const onResetPassword = (state) => state.merge({ fetching: true, resetPasswordApiStatus: 0 })

// successful api lookup
export const onResetPasswordsuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, user: response, resetPasswordApiStatus: 1 })
}
// Something went wrong somewhere.
export const onResetPasswordfailure = (state, { response }) =>
  state.merge({ fetching: false, error: true, resetPasswordApiStatus: 2, resetPasswordError: response })

export const onVerifyUser = state =>  state.merge({ fetching: true })
export const onVerifyUserSuccess = state =>  state.merge({ fetching: false })
export const onVerifyUserFail = state => state.merge({ fetching: false })

export const onPlantLists = (state, action) => state.merge({ fetchingPlaces: true });
export const onPlantListsSuccess = (state, { data }) => {
  return state.merge({ placesList: data, fetchingPlaces: false  });
}
export const onPlantListsFail = state => state.merge({ placesList: [], fetchingPlaces: false })

export const onLogout = state =>
  state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  // Login Requests
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  // Reset States On Navigation
  [Types.RESET_STATE_ON_NAVIGATION]: changeStateOnNavigation,
  // Verify User
  [Types.VERIFY_USER]: onVerifyUser,
  [Types.VERIFY_USER_SUCCESS]: onVerifyUserSuccess,
  [Types.VERIFY_USER_FAIL]: onVerifyUserFail,
  // OTP Requests
  [Types.OTP_REQUEST]: getOTPrequest,
  [Types.OTP_SUCCESS]: getOTPsuccess,
  [Types.OTP_FAILURE]: getOTPfailure,
  // // Verify OTP
  // [Types.VERIFY_OTP]: verifyOTPRequest,
  // [Types.VERIFY_OTP_SUCCESS]: verifyOTPsuccess,
  // [Types.VERIFY_OTP_FAILURE]: verifyOTPfailure,
  // Sign Up Requests
  [Types.SIGNUP_REQUEST]: onSignUp,
  [Types.SIGNUP_SUCCESS]: onSignUpsuccess,
  [Types.SIGNUP_FAILURE]: onSignUpfailure,
  // Reset Password Request
  [Types.RESET_PASSWORD_REQUEST]: onResetPassword,
  [Types.RESET_PASSWORD_SUCCESS]: onResetPasswordsuccess,
  [Types.RESET_PASSWORD_FAILURE]: onResetPasswordfailure,

  [Types.GET_PRE_LOGIN_PLACES_LIST]: onPlantLists,
  [Types.GET_PRE_LOGIN_PLACES_LIST_SUCCESS]: onPlantListsSuccess,
  [Types.GET_PRE_LOGIN_PLACES_LIST_FAIL]: onPlantListsFail,
  
  // Logout Request
  [Types.LOGOUT_REQUEST]: onLogout,
})
