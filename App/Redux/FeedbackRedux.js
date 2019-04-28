import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedbackRequest: ['accessToken', 'pageNo'],
  feedbackSuccess: ['payload'],
  feedbackFailure: null,
  getPlacesList: ['accessToken','searchParam'],
  getPlacesListSuccess: ['data'],
  getPlacesListFail:['data'],
  getDepartmentsList: ['accessToken'],
  getDepartmentsListSuccess: ['data'],
  getDepartmentsListFail:['data'],
  createFeedback: ['accessToken', 'data'],
  createFeedbackSuccess: ['data'],
  createFeedbackFail:['data'],
  resetStateOnNavigation: ['data'],
})

export const FeedbackTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  departments:[],
  statuses: [],
  plantsList: [],
  listData: [],
})

/* ------------- Selectors ------------- */

export const FeedbackSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const request = (state, { data }) =>
  state.merge({ fetching: true, fetchListAPIStatus: 0 })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, listData: state.listData.concat(payload) })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, listData: [], fetchListAPIStatus: 2 })

export const onRequestDeptsLists = (state, action) => state.merge(({ fetching: true }));
export const onRequestDeptsSuccess = (state, { data }) => {
  return state.merge({ fetching: false, ...data })
}
export const onRequestDeptsFail = state => {
  return state.merge({ fetching: false, })
}

export const onCreateFeedback = (state, action) => state.merge(({ fetching: true }));
export const onCreateFeedbackSuccess = (state, { data }) => {
  return state.merge({ fetching: false, createFeedbackResponse: data })
}
export const onCreateFeedbackFail = state => {
  return state.merge({ fetching: false, })
}
export const resetState = state => state.merge({ fetching: null, createFeedbackResponse: null })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEEDBACK_REQUEST]: request,
  [Types.FEEDBACK_SUCCESS]: success,
  [Types.FEEDBACK_FAILURE]: failure,
  [Types.GET_DEPARTMENTS_LIST]:onRequestDeptsLists,
  [Types.GET_DEPARTMENTS_LIST_SUCCESS]:onRequestDeptsSuccess,
  [Types.GET_DEPARTMENTS_LIST_FAIL]:onRequestDeptsFail,
  [Types.CREATE_FEEDBACK]:onCreateFeedback,
  [Types.CREATE_FEEDBACK_SUCCESS]:onCreateFeedbackSuccess,
  [Types.CREATE_FEEDBACK_FAIL]:onCreateFeedbackFail,
  [Types.RESET_STATE_ON_NAVIGATION]: resetState,
})
