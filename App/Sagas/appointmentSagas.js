import { call, put, all } from 'redux-saga/effects'
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';
import { NavigationActions } from 'react-navigation';
import { ToastActionsCreators } from 'react-native-redux-toast';
import AppointmentActions from '../Redux/AppointmentRedux';
import LoginActions from '../Redux/LoginRedux';
import request from '../Services/request'

// import { ModuleSelectors } from '../Redux/ModuleRedux'
const moduleURL = 'appointments';

export function* getAppointmentsList({ accessToken, pageNo }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}?access_token=${accessToken}&page=${pageNo}`, options);
    switch (status) {
      case undefined:
        {
          yield put(AppointmentActions.appointmentOnListFailure(503));
          yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
          break;
        }
      case 401:
        {
          yield put(NavigationActions.navigate({ routeName: 'Login' }))
          yield put(AppointmentActions.appointmentOnListFailure(status));
          yield put(ToastActionsCreators.displayWarning('Invalid Access'));
          yield put(LoginActions.logoutRequest(accessToken));
          // TO DO ADD LOGOUT
          break;
        }
      case 200:
        {
          yield put(AppointmentActions.appointmentOnListSuccess(body, pageNo))
          if (!(body && body.length)) {
            yield put(ToastActionsCreators.displayInfo('End of List'));
          }
          break;
        }
      default:
        {
          yield put(AppointmentActions.appointmentOnListFailure(status || 503));
          if (body && body.message && typeof body.message === 'string') {
            yield put(ToastActionsCreators.displayInfo(message));
          } else {
            yield put(ToastActionsCreators.displayInfo('oops!!'));
          }
        }
    }

  } catch (error) {
    yield put(AppointmentActions.appointmentOnListFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


export function* getAppointmentDetails({ accessToken, id }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}/${id}?access_token=${accessToken}`, options);
    switch (status) {
      case undefined:
        {
          yield put(AppointmentActions.appointmentOnDetailFailure(503));
          yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
          break;
        }
      case 401:
        {
          yield put(NavigationActions.navigate({ routeName: 'Login' }))
          yield put(AppointmentActions.appointmentOnDetailFailure(status));
          yield put(ToastActionsCreators.displayWarning('Invalid Access'));
          yield put(LoginActions.logoutRequest(accessToken));
          // TO DO ADD LOGOUT
          break;
        }
      case 200:
        {
          yield put(AppointmentActions.appointmentOnDetailSuccess(body))
          break;
        }
      default:
        {
          yield put(AppointmentActions.appointmentOnDetailFailure(status || 503));
          if (body && body.message && typeof body.message === 'string') {
            yield put(ToastActionsCreators.displayInfo(message));
          } else {
            yield put(ToastActionsCreators.displayInfo('oops!!'));
          }
        }
    }

  } catch (error) {
    yield put(AppointmentActions.appointmentOnDetailFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}

export function* createAppointment({ accessToken, data }) {
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


    const { body, status } = yield call(request, `${BASE_URL}${API_VERSION}appointments?access_token=${accessToken}`, options);
    switch (status) {
      case undefined:
        {
          yield put(AppointmentActions.createAppointmentFail(503));
          yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
          break;
        }
      case 401:
        {
          yield put(NavigationActions.navigate({ routeName: 'Login' }))
          yield put(AppointmentActions.createAppointmentFail(status));
          yield put(ToastActionsCreators.displayWarning('Invalid Access'));
          yield put(LoginActions.logoutRequest(accessToken));
          break;
        }
      case 200:
        {
          yield put(AppointmentActions.createAppointmentSuccess(body));
          yield put(ToastActionsCreators.displayInfo('ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ'));
          break;
        }
      default:
        {
          yield put(AppointmentActions.createAppointmentFail(status || 503));
          if (body && body.message && typeof body.message === 'string') {
            yield put(ToastActionsCreators.displayInfo(message));
          } else {
            yield put(ToastActionsCreators.displayInfo('oops!!'));
          }
        }
    }

  } catch (error) {
    yield put(AppointmentActions.createAppointmentFail(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}
