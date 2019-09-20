import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUserDetails: ['accessToken'],
  getUserDetailsSuccess: ['userDetails'],
  getUserDetailsFail: ['errorCode'],

  updateUserDetails: ['accessToken', 'user_id', 'data'],
  updateUserDetailsSuccess: ['userDetails'],
  updateUserDetailsFail: ['errorCode'],

  onReset: ['accessToken'],
})

export const RootTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  userDetails: null,
  errorCode: null
})

/* ------------- Selectors ------------- */

export const RootSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({ fetching: true })

export const success = (state, action) => {
  const { userDetails } = action
  return state.merge({ fetching: false, errorCode: null, userDetails })
}

export const failure = (state, { errorCode }) =>
  state.merge({ fetching: false, errorCode, userDetails: null })

export const onUpdaterequest = (state) =>
  state.merge({ fetching: true })

export const onUpdaterequestSuccess = (state, action) => {
  const { userDetails } = action
  return state.merge({ fetching: false, errorCode: null, userDetails })
}

export const onUpdaterequestfailure = (state, { errorCode }) =>
  state.merge({ fetching: false, errorCode, userDetails: null })

export const onReset = state =>
  state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER_DETAILS]: request,
  [Types.GET_USER_DETAILS_SUCCESS]: success,
  [Types.GET_USER_DETAILS_FAIL]: failure,

  [Types.UPDATE_USER_DETAILS]: onUpdaterequest,
  [Types.UPDATE_USER_DETAILS_SUCCESS]: onUpdaterequestSuccess,
  [Types.UPDATE_USER_DETAILS_FAIL]: onUpdaterequestfailure,
  [Types.ON_RESET]: onReset,
})
