import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedbackOnListRequest: ['accessToken', 'pageNo'],
  feedbackOnListSuccess: ['listData', 'pageNo'],
  feedbackOnListFailure: ['errorCode'],
  feedbackOnListReset: ['payload'],
  feedbackOnDetailRequest: ['accessToken', 'id'],
  feedbackOnDetailSuccess: ['detailData'],
  feedbackOnDetailFailure: ['errorCode'],

  getPlacesList: ['searchParam'],
  getPlacesListSuccess: ['data'],
  getPlacesListFail: ['errorCode'],

  getDepartmentsList: ['accessToken'],
  getDepartmentsListSuccess: ['data'],
  getDepartmentsListFail: ['data'],

  createFeedback: ['accessToken', 'data'],
  createFeedbackSuccess: ['data'],
  createFeedbackFail: ['errorCode'],

  resetStateOnNavigation: ['code'],

});

export const FeedbackTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  listData: null,
  listError: null,
  listData: [],
  lastCalledPage: 1,
  detailError: null,
  detailData: {},
  plantsList: [],
  departments: [],
  statuses: [],
  createFeedbackErrorCode: null,
})

/* ------------- Selectors ------------- */

export const FeedbackSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// This is called when the list fetch API is called
export const onListRequest = (state) =>
  state.merge({ 
    fetching: true,
  });

// This is called when the list fetch API is Successfull
export const onListFetchSuccess = (state, action) => {
  const { listData, pageNo } = action;
  return state.merge({ 
    fetching: false, 
    listError: null, 
    listData,
    lastCalledPage: pageNo, 
  })
}

// This is called when the list fetch API Fails
export const OnListFetchFail = (state, { errorCode }) => {
  return state.merge({ 
    fetching: false, 
    listError: errorCode, 
    listData: [] 
  });
}


export const onDetailRequest = (state) =>
  state.merge({ 
    fetching: true,
  });

// This is called when the list fetch API is Successfull
export const onDetailFetchSuccess = (state, action) => {
  const { detailData } = action;
  return state.merge({ 
    fetching: false, 
    detailError: null, 
    detailData,
  })
}

// This is called when the list fetch API Fails
export const OnDetailFetchFail = (state, { errorCode }) => {
  return state.merge({ 
    fetching: false, 
    detailError: errorCode, 
    detailData: {},
  });
}

export const onPlacesListsFetch = (state, action) => state;
export const onPlacesListsSuccess = (state, { data }) => {
  return state.merge({ plantsList: data, createFeedbackErrorCode: null});
}
export const onPlacesListsFail = (state, { errorCode }) => state.merge({ 
  plantsList: [], 
  createFeedbackErrorCode: errorCode
});

export const onRequestDeptsLists = (state) => state.merge({ fetching: true });
export const onRequestDeptsSuccess = (state, { data }) => {
  return state.merge({ fetching: false, ...data, createFeedbackErrorCode: null })
}
export const onRequestDeptsFail = (state, { errorCode }) => {
  return state.merge({ fetching: false, createFeedbackErrorCode: errorCode })
}

export const onCreateFeedback = (state, action) => state.merge(({ fetching: true }));
export const onCreateFeedbackSuccess = (state, { data }) => {
  return state.merge({ fetching: false, createFeedbackResponse: data, formError: null })
}
export const onCreateFeedbackFail = (state, { errorCode }) => {
  return state.merge({ fetching: false, createFeedbackErrorCode: errorCode  })
}

export const resetFeedbackCreate = state => state.merge({ createFeedbackResponse: null, plantsList: [] });
export const onListReset = state =>
    state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEEDBACK_ON_LIST_REQUEST]: onListRequest,
  [Types.FEEDBACK_ON_LIST_SUCCESS]: onListFetchSuccess,
  [Types.FEEDBACK_ON_LIST_FAILURE]: OnListFetchFail,
  [Types.FEEDBACK_ON_LIST_RESET]: onListReset,

  [Types.FEEDBACK_ON_DETAIL_REQUEST]: onDetailRequest,
  [Types.FEEDBACK_ON_DETAIL_SUCCESS]: onDetailFetchSuccess,
  [Types.FEEDBACK_ON_DETAIL_FAILURE]: OnDetailFetchFail,
  
  [Types.GET_PLACES_LIST]: onPlacesListsFetch,
  [Types.GET_PLACES_LIST_SUCCESS]: onPlacesListsSuccess,
  [Types.GET_PLACES_LIST_FAIL]: onPlacesListsFail,

  [Types.GET_DEPARTMENTS_LIST]: onRequestDeptsLists,
  [Types.GET_DEPARTMENTS_LIST_SUCCESS]: onRequestDeptsSuccess,
  [Types.GET_DEPARTMENTS_LIST_FAIL]: onRequestDeptsFail,

  [Types.CREATE_FEEDBACK]: onCreateFeedback,
  [Types.CREATE_FEEDBACK_SUCCESS]: onCreateFeedbackSuccess,
  [Types.CREATE_FEEDBACK_FAIL]: onCreateFeedbackFail,

  [Types.RESET_STATE_ON_NAVIGATION]: resetFeedbackCreate,


  // [Types.MODULE_ON_LIST_RESET]: onListReset,
});