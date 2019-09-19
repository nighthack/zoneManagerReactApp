import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  devWorkOnListRequest: ['accessToken', 'pageNo', 'panchayat_id'],
  devWorkOnListSuccess: ['listData', 'pageNo'],
  devWorkOnListFailure: ['errorCode'],
  devWorkOnListReset: ['payload'],
  devWorkOnDetailRequest: ['accessToken', 'id'],
  devWorkOnDetailSuccess: ['detailData'],
  devWorkOnDetailFailure: ['errorCode'],

});

export const DevWorkTypes = Types
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
})

/* ------------- Selectors ------------- */

export const ModuleSelectors = {
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

  export const onListReset = state =>
    state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEV_WORK_ON_LIST_REQUEST]: onListRequest,
  [Types.DEV_WORK_ON_LIST_SUCCESS]: onListFetchSuccess,
  [Types.DEV_WORK_ON_LIST_FAILURE]: OnListFetchFail,
  [Types.DEV_WORK_ON_LIST_RESET]: onListReset,

  [Types.DEV_WORK_ON_DETAIL_REQUEST]: onDetailRequest,
  [Types.DEV_WORK_ON_DETAIL_SUCCESS]: onDetailFetchSuccess,
  [Types.DEV_WORK_ON_DETAIL_FAILURE]: OnDetailFetchFail,
  // [Types.MODULE_ON_LIST_RESET]: onListReset,
});
