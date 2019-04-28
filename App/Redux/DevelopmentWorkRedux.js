import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  developmentWorkRequest: ['accessToken', 'pageNo'],
  developmentWorkSuccess: ['payload'],
  developmentWorkFailure: ['error'],
  developmentWorkDetailsRequest: ['id','accessToken'],
  developmentWorkDetailsSuccess: ['payload'],
  developmentWorkDetailsFailure: ['error']
})

export const DevelopmentWorkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  listData: [],
  fetching: null,
  payload: null,
  error: null,
  dataDetails: {},
})

/* ------------- Selectors ------------- */

export const DevelopmentWorkSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, listData: [] })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, listData:[...state.listData, ...payload] })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, listData: [] })

// request the data from an api
export const developmentDetailsRequest = (state, { data }) =>
  state.merge({ fetchingDetails: true, dataDetails: data })

// successful api lookup
export const developmentDetailsSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetchingDetails: false, errorFetchingDetails: null, dataDetails: payload })
}

// Something went wrong somewhere.
export const developmentDetailsfailure = state =>
  state.merge({ fetchingDetails: false, errorFetchingDetails: true, dataDetails: {} })  

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEVELOPMENT_WORK_REQUEST]: request,
  [Types.DEVELOPMENT_WORK_SUCCESS]: success,
  [Types.DEVELOPMENT_WORK_FAILURE]: failure,
  [Types.DEVELOPMENT_WORK_DETAILS_REQUEST]: developmentDetailsRequest,
  [Types.DEVELOPMENT_WORK_DETAILS_SUCCESS]: developmentDetailsSuccess,
  [Types.DEVELOPMENT_WORK_DETAILS_FAILURE]: developmentDetailsfailure,
})
