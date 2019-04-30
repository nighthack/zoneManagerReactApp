import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable';
import { NavigationActions } from 'react-navigation';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  beneficiaryRequest: ['accessToken', 'pageNo', 'lastCalledPage'],
  beneficiarySuccess: ['response', 'pageNo'],
  beneficiaryFailure: null,
  beneficiaryDetailsRequest: ['id', 'accessToken', ],
  beneficiaryDetailsSuccess: ['response'],
  beneficiaryDetailsFailure: null,
  beneficiaryLogoutRequest: ['accessToken'],
})

export const BeneficiaryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  payload: null,
  error: null,
  beneficiaryList: [],
  beneficiaryDetails: {},
  lastCalledPage: 0,
  currentPage: 1,
})

/* ------------- Selectors ------------- */

export const BeneficiarySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { response, pageNo } = action;
  return state.merge({
    fetching: false,
    error: null,
    beneficiaryList: [...state.beneficiaryList, ...response],
    lastCalledPage: pageNo,
    currentPage: pageNo + 1,
  });
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })


// request the data from an api
export const beneficiaryDetailrequest = (state) =>
  state.merge({ detailFetching: true })

// successful api lookup
export const beneficiaryDetailsuccess = (state, action) => {
  const { response,  } = action;
  const { lastCalledPage, currentPage } = state;
  return state.merge({
    detailFetching: false,
    detailError: null,
    beneficiaryDetails: response,
    lastCalledPage: currentPage,
    currentPage: currentPage + 1
  })
}

// Something went wrong somewhere.
export const beneficiaryDetailfailure = state =>
  state.merge({ detailFetching: false, detailError: true })

export const onLogout = state =>
  state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BENEFICIARY_REQUEST]: request,
  [Types.BENEFICIARY_SUCCESS]: success,
  [Types.BENEFICIARY_FAILURE]: failure,
  [Types.BENEFICIARY_DETAILS_REQUEST]: beneficiaryDetailrequest,
  [Types.BENEFICIARY_DETAILS_SUCCESS]: beneficiaryDetailsuccess,
  [Types.BENEFICIARY_DETAILS_FAILURE]: beneficiaryDetailfailure,
  [Types.BENEFICIARY_LOGOUT_REQUEST]: onLogout,
})
