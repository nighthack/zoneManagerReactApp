import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUserDetails: ['accessToken'],
  getUserDetailsSuccess: ['userDetails'],
  getUserDetailsFail: ['errorCode']
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

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { userDetails } = action
  return state.merge({ fetching: false, errorCode: null, userDetails })
}

// Something went wrong somewhere.
export const failure = (state, { errorCode }) =>
  state.merge({ fetching: false, errorCode, userDetails: null })

export const onListReset = state =>
  state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER_DETAILS]: request,
  [Types.GET_USER_DETAILS_SUCCESS]: success,
  [Types.GET_USER_DETAILS_FAIL]: failure
})
