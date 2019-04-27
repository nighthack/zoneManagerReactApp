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
import DevelopmentWorkActions from '../Redux/DevelopmentWorkRedux'
import request from '../Services/request'
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';

export function * getDevelopmentList ({ accessToken }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}development_works?access_token=${accessToken}`, options);
    yield put(DevelopmentWorkActions.developmentWorkSuccess(body))
  } catch (e) {
    yield put(DevelopmentWorkActions.developmentWorkFailure())
  }
}

export function * getDevelopmentDetails ({ accessToken, id }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}development_works/${id}?access_token=${accessToken}`, options);
    yield put(DevelopmentWorkActions.developmentWorkDetailsSuccess(body))
  } catch (e) {
    yield put(DevelopmentWorkActions.developmentWorkDetailsFailure())
  }
}