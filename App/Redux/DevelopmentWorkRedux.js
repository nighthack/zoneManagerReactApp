import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  developmentWorkRequest: ['accessToken', 'pageNo' ,'lastCalledPage'],
  developmentWorkSuccess: ['payload', 'pageNo'],
  developmentWorkFailure: ['error'],
  developmentWorkDetailsRequest: ['id','accessToken'],
  developmentWorkDetailsSuccess: ['payload'],
  developmentWorkDetailsFailure: ['error'],
  developmentWorkLogoutRequest: ['accessToken'],
})

export const DevelopmentWorkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  listData: [],
  fetching: false,
  payload: null,
  error: null,
  dataDetails: {},
  lastCalledPage: 0,
  currentPage: 1,
})

/* ------------- Selectors ------------- */

export const DevelopmentWorkSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => state.merge({ fetching: true })
 

// successful api lookup
export const success = (state, action) => {
  const { payload, pageNo } = action;
  return state.merge({ 
    fetching: false, 
    error: null, 
    listData: [...state.listData, ...payload], 
    lastCalledPage: pageNo, 
    currentPage: pageNo + 1 
  });
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

export const onLogout = state =>
  state.merge(INITIAL_STATE)
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEVELOPMENT_WORK_REQUEST]: request,
  [Types.DEVELOPMENT_WORK_SUCCESS]: success,
  [Types.DEVELOPMENT_WORK_FAILURE]: failure,
  [Types.DEVELOPMENT_WORK_DETAILS_REQUEST]: developmentDetailsRequest,
  [Types.DEVELOPMENT_WORK_DETAILS_SUCCESS]: developmentDetailsSuccess,
  [Types.DEVELOPMENT_WORK_DETAILS_FAILURE]: developmentDetailsfailure,
  [Types.DEVELOPMENT_WORK_LOGOUT_REQUEST]: onLogout,
})
