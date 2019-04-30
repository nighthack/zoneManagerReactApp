/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import EventActions from '../Redux/EventRedux'
import request from '../Services/request'
import { NavigationActions } from 'react-navigation'
import { ToastActionsCreators } from 'react-native-redux-toast';
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';

export function * getEventsList ({ accessToken, pageNo, lastCalledPage }) {
  try {
    const options = {
      method: 'GET',
    };
    if(lastCalledPage !== pageNo) { 
      const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}events?page=${pageNo}&access_token=${accessToken}`, options);
      if(status >= 200 && status < 300) {
        if (!(body && body.length)) {
          yield put(ToastActionsCreators.displayInfo('Nothing New to Show'));
        }
        yield put(EventActions.eventSuccess(body, pageNo));
      } else if( status === 401) {
        yield put(ToastActionsCreators.displayWarning('Invalid Session Please Login'));
        yield put(NavigationActions.navigate({ routeName: 'Login' }));
      } else {
        yield put(EventActions.eventFailure());
      }
    } else {
      yield put(ToastActionsCreators.displayInfo('Nothing New to Show'));
      yield put(EventActions.eventSuccess([], lastCalledPage));
    }
  } catch (e) {
    yield put(EventActions.eventFailure());
  }
}

export function * getEventDetails ({ accessToken, id }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}events/${id}?access_token=${accessToken}`, options);
    if(status >= 200 && status < 300) {
      yield put(EventActions.eventDetailsSuccess(body))
    } else if( status === 401) {
    	yield put(NavigationActions.navigate({ routeName: 'Login' }))
    	yield put(ToastActionsCreators.displayWarning('Invalid Session Please Login'))
    } else {
    	yield put(EventActions.eventDetailsFailure())
    }
  } catch (e) {
    yield put(EventActions.developmentWorkDetailsFailure())
  }
}