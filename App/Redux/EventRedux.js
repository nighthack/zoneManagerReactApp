import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventRequest: ['accessToken', 'pageNo'],
  eventSuccess: ['payload'],
  eventFailure: null,
  eventDetailsRequest: ['id','accessToken'],
  eventDetailsSuccess: ['payload'],
  eventDetailsFailure: ['error']
})

export const EventTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  eventsList: [],
  error: null,
  dataDetails: {},
})

/* ------------- Selectors ------------- */

export const EventSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, eventsList:[...state.eventsList, ...payload] })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true,  })

/* ------------- Hookup Reducers To Types ------------- */
// request the data from an api
export const eventDetailsRequest = (state, { data }) => 
  state.merge({ fetchingDetails: true, dataDetails: data })

// successful api lookup
export const eventDetailsSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetchingDetails: false, errorFetchingDetails: null, dataDetails: payload })
}

// Something went wrong somewhere.
export const eventDetailsfailure = state =>
  state.merge({ fetchingDetails: false, errorFetchingDetails: true, dataDetails: {} })  

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_REQUEST]: request,
  [Types.EVENT_SUCCESS]: success,
  [Types.EVENT_FAILURE]: failure,
  [Types.EVENT_DETAILS_REQUEST]: eventDetailsRequest,
  [Types.EVENT_DETAILS_SUCCESS]: eventDetailsSuccess,
  [Types.EVENT_DETAILS_FAILURE]: eventDetailsfailure,
})
