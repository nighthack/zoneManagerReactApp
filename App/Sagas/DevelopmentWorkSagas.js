import { call, put } from 'redux-saga/effects'
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';
import { NavigationActions } from 'react-navigation';
import { ToastActionsCreators } from 'react-native-redux-toast';
import DevWorkActions from '../Redux/DevelopmentWorkRedux';
import LoginActions from '../Redux/LoginRedux';
import request from '../Services/request'

// import { ModuleSelectors } from '../Redux/ModuleRedux'
const moduleURL = 'development_works';

export function* getDevWorksList({ accessToken, pageNo, panchayat_id }) {
  try {
    const options = {
      method: 'GET',
    };
    const panchayattag = panchayat_id ? `&panchayat_id=${panchayat_id}` : '';
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}?access_token=${accessToken}&page=${pageNo}${panchayattag}`, options);
    switch (status) {
      case undefined: {
        yield put(DevWorkActions.devWorkOnListFailure(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(DevWorkActions.devWorkOnListFailure(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        break;
      }
      case 200: {
        yield put(DevWorkActions.devWorkOnListSuccess(body, pageNo))
        if (!(body && body.length)) {
          // yield put(ToastActionsCreators.displayInfo('End of List'));
        }
        break;
      }
      default: {
        yield put(DevWorkActions.devWorkOnListFailure(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    console.log(error);
    yield put(DevWorkActions.devWorkOnListFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


export function* getDevWorkDetails({ accessToken, id }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}/${id}?access_token=${accessToken}`, options);
    switch (status) {
      case undefined: {
        yield put(DevWorkActions.devWorkOnDetailFailure(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(DevWorkActions.devWorkOnDetailFailure(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(DevWorkActions.devWorkOnDetailSuccess(body))
        break;
      }
      default: {
        yield put(DevWorkActions.devWorknDetailFailure(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    yield put(DevWorkActions.devWorkOnDetailFailure(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}
