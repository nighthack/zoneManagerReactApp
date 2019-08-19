import { call, put } from 'redux-saga/effects'
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';
import { format, subDays } from 'date-fns';
import { NavigationActions } from 'react-navigation';
import { ToastActionsCreators } from 'react-native-redux-toast';
import EventActions from '../Redux/EventRedux';
import LoginActions from '../Redux/LoginRedux';
import request from '../Services/request'

// import { ModuleSelectors } from '../Redux/ModuleRedux'
const moduleURL = 'events';

export function* getEventsList({ accessToken, pageNo }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}?access_token=${accessToken}&page=${pageNo}`, options);
    switch (status) {
      case undefined: {
        yield put(EventActions.eventOnListFailure(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(EventActions.eventOnListFailure(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(EventActions.eventOnListSuccess(body, pageNo));
        if (!(body && body.length)) {
          yield put(ToastActionsCreators.displayInfo('End of List'));
        }
        break;
      }
      default: {
        yield put(EventActions.eventOnListFailure(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(EventActions.eventOnListFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


export function* getEventDetails({ accessToken, id }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}/${id}?access_token=${accessToken}`, options);
    switch (status) {
      case undefined: {
        yield put(EventActions.eventOnDetailFailure(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(EventActions.eventOnDetailFailure(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(EventActions.eventOnDetailSuccess(body))
        break;
      }
      default: {
        yield put(EventActions.eventOnDetailFailure(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(EventActions.eventOnDetailFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


export function* getLastWeekEventsList({ accessToken, pageNo }) {
  const today  = format(new Date(), 'YYYY-MM-DD');
  const lastWeek = format(subDays(new Date(), 7), 'YYYY-MM-DD')
  try {
    const options = {
      method: 'GET',
    };

    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}?access_token=${accessToken}&start_date=${lastWeek}&end_date=${today}`, options);
    switch (status) {
      case undefined: {
        yield put(EventActions.oldEventOnListFailure(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(EventActions.oldEventOnListFailure(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(EventActions.oldEventOnListSuccess(body, pageNo));
        if (!(body && body.length)) {
          yield put(ToastActionsCreators.displayInfo('End of List'));
        }
        break;
      }
      default: {
        yield put(EventActions.oldEventOnListFailure(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(EventActions.oldEventOnListFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}
