import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventOnListRequest: ['accessToken', 'pageNo'],
  eventOnListSuccess: ['listData', 'pageNo'],
  eventOnListFailure: ['errorCode'],
  eventOnListReset: ['payload'],
  eventOnDetailRequest: ['accessToken', 'id'],
  eventOnDetailSuccess: ['detailData'],
  eventOnDetailFailure: ['errorCode'],

  oldEventOnListRequest: ['accessToken', 'pageNo'],
  oldEventOnListSuccess: ['listData', 'pageNo'],
  oldEventOnListFailure: ['errorCode'],
  oldEventOnListReset: ['payload'],

});

export const EventTypes = Types
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
  oldListData: [],
})

/* ------------- Selectors ------------- */

export const EventSelectors = {
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

// This is called when the list fetch API is called
export const onOldListRequest = (state) =>
  state.merge({ 
    fetching: true,
  });

// This is called when the list fetch API is Successfull
export const onOldListFetchSuccess = (state, action) => {
  const { listData } = action;
  return state.merge({ 
    fetching: false, 
    listError: null, 
    oldListData: listData,
  })
}

// This is called when the list fetch API Fails
export const OnOldListFetchFail = (state, { errorCode }) => {
  return state.merge({ 
    fetching: false, 
    listError: errorCode, 
    oldListData: [] 
  });
}
  export const onReset = state =>
    state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_ON_LIST_REQUEST]: onListRequest,
  [Types.EVENT_ON_LIST_SUCCESS]: onListFetchSuccess,
  [Types.EVENT_ON_LIST_FAILURE]: OnListFetchFail,
  [Types.EVENT_ON_LIST_RESET]: onReset,

  [Types.EVENT_ON_DETAIL_REQUEST]: onDetailRequest,
  [Types.EVENT_ON_DETAIL_SUCCESS]: onDetailFetchSuccess,
  [Types.EVENT_ON_DETAIL_FAILURE]: OnDetailFetchFail,

  [Types.OLD_EVENT_ON_LIST_REQUEST]: onOldListRequest,
  [Types.OLD_EVENT_ON_LIST_SUCCESS]: onOldListFetchSuccess,
  [Types.OLD_EVENT_ON_LIST_FAILURE]: OnOldListFetchFail,
  [Types.OLD_EVENT_ON_LIST_RESET]: onReset,
  // [Types.MODULE_ON_LIST_RESET]: onListReset,
});
