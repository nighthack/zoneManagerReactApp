import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedbackRequest: ['accessToken'],
  feedbackSuccess: ['payload'],
  feedbackFailure: null,
  getPlacesList: ['accessToken','searchparam'],
  getPlacesListSuccess: ['data'],
  getPlacesListFail:['data'],
  getDepartmentsList: ['accessToken'],
  getDepartmentsListSuccess: ['data'],
  getDepartmentsListFail:['data'],
})

export const FeedbackTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const FeedbackSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, listData: [] })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, listData:payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, listData: [] })


export const onPlantLists = (state, action) => state;
export const onPlantListsSuccess = (state, action) => {
  debugger;
  return state;
}
export const onPlantListsFail = state => state

export const onRequestDeptsLists = (state, action) => {
  debugger;
  return state;
}  
export const onRequestDeptsSuccess = state => state
export const onRequestDeptsFail = state => state
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEEDBACK_REQUEST]: request,
  [Types.FEEDBACK_SUCCESS]: success,
  [Types.FEEDBACK_FAILURE]: failure,
  [Types.GET_PLACES_LIST]: onPlantLists,
  [Types.GET_PLACES_LIST_SUCCESS]: onPlantListsSuccess,
  [Types.GET_PLACES_LIST_FAIL]: onPlantListsFail,
  [Types.GET_DEPARTMENTS_LIST]:onRequestDeptsLists,
  [Types.GET_DEPARTMENTS_LIST_SUCCESS]:onRequestDeptsSuccess,
  [Types.GET_DEPARTMENTS_LIST_FAIL]:onRequestDeptsFail,

})
