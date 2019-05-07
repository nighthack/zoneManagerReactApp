import { call, put, all } from 'redux-saga/effects'
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';
import { NavigationActions } from 'react-navigation';
import { ToastActionsCreators } from 'react-native-redux-toast';
import FeedbackActions from '../Redux/FeedbackRedux';
import LoginActions from '../Redux/LoginRedux';
import request from '../Services/request'

// import { ModuleSelectors } from '../Redux/ModuleRedux'
const moduleURL = 'feedbacks';

export function* getFeedbackList({ accessToken, pageNo }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}?access_token=${accessToken}&page=${pageNo}`, options);
    switch (status) {
      case undefined: {
        yield put(FeedbackActions.feedbackOnListFailure(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(FeedbackActions.feedbackOnListFailure(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(FeedbackActions.feedbackOnListSuccess(body, pageNo))
        if (!(body && body.length)) {
          yield put(ToastActionsCreators.displayInfo('End of List'));
        }
        break;
      }
      default: {
        yield put(FeedbackActions.feedbackOnListFailure(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(FeedbackActions.feedbackOnListFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


export function* getFeedbackDetails({ accessToken, id }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}/${id}?access_token=${accessToken}`, options);
    switch (status) {
      case undefined: {
        yield put(FeedbackActions.feedbackOnDetailFailure(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(FeedbackActions.feedbackOnDetailFailure(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(FeedbackActions.feedbackOnDetailSuccess(body))
        break;
      }
      default: {
        yield put(FeedbackActions.feedbackOnDetailFailure(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(FeedbackActions.feedbackOnDetailFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


export function* getPlacesListForSearchParam({ searchParam }) {
  try {
    const options = {
      method: 'GET',
    };

    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}commons/places?app_token=${APP_TOKEN}&search=${searchParam}`, options);
    switch (status) {
      case undefined: {
        yield put(FeedbackActions.getPlacesListFail(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(FeedbackActions.getPlacesListFail(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(FeedbackActions.getPlacesListSuccess(body))
        break;
      }
      default: {
        yield put(FeedbackActions.getPlacesListFail(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(FeedbackActions.getPlacesListFail(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}

export function* getDepartmentsList({ accessToken }) {
  try {
    const options = {
      method: 'GET',
    };

    const { departments, statuses } = yield all({
      departments: call(request, `${BASE_URL}${API_VERSION}commons/departments?access_token=${accessToken}`, options),
      statuses: call(request, `${BASE_URL}${API_VERSION}commons/status_list?access_token=${accessToken}&model=Feedback`, options),
    });
    const status = departments.status;
    switch (status) {
      case undefined: {
        yield put(FeedbackActions.getDepartmentsListFail(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(FeedbackActions.getDepartmentsListFail(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        break;
      }
      case 200: {
        yield put(FeedbackActions.getDepartmentsListSuccess({ departments: departments.body, statuses:statuses.body }))
        break;
      }
      default: {
        yield put(FeedbackActions.getDepartmentsListFail(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(FeedbackActions.getDepartmentsListFail(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


export function* createFeedback({ accessToken, data }) {
  try {
    const headers = new Headers({
      'Content-Type': 'multipart/form-data',
      "cache-control": "no-cache",
    });
    data.append("app_token", APP_TOKEN);
    const options = {
      method: 'POST',
      body: data,
      headers,
      processData: false,
      contentType: false,
      credentials: 'same-origin'
    };
    

    const { body, status } = yield call(request, `${BASE_URL}${API_VERSION}feedbacks?access_token=${accessToken}`, options);
    switch (status) {
      case undefined: {
        yield put(FeedbackActions.createFeedbackFail(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(FeedbackActions.createFeedbackFail(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        break;
      }
      case 200: {
        yield put(FeedbackActions.createFeedbackSuccess(body));
        // yield put(FeedbackActions.feedbackOnListRequest(accessToken, 1));
        yield put(ToastActionsCreators.displayInfo('Thanks for your valuable feedback'));
        break;
      }
      default: {
        yield put(FeedbackActions.createFeedbackFail(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(FeedbackActions.createFeedbackFail(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}