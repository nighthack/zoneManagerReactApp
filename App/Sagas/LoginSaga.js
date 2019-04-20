// /* ***********************************************************
// * A short word on how to use this automagically generated file.
// * We're often asked in the ignite gitter channel how to connect
// * to a to a third party api, so we thought we'd demonstrate - but
// * you should know you can use sagas for other flow control too.
// *
// * Other points:
// *  - You'll need to add this saga to sagas/index.js
// *  - This template uses the api declared in sagas/index.js, so
// *    you'll need to define a constant in that file.
// *************************************************************/

// import { call, put } from 'redux-saga/effects'
// import LoginActions from '../Redux/LoginRedux'
// // import { LoginSagaSelectors } from '../Redux/LoginSagaRedux'

// export function * getLoginSaga (api, action) {
//   debugger;
//   const { data } = action
//   // get current data from Store
//   // const currentData = yield select(LoginSagaSelectors.getData)
//   // make the call to the api
//   const response = yield call(api.getloginSaga, data)

//   // success?
//   if (response.ok) {
//     // You might need to change the response here - do this with a 'transform',
//     // located in ../Transforms/. Otherwise, just pass the data back from the api.
//     yield put(LoginActions.loginSagaSuccess(response.data))
//   } else {
//     yield put(LoginActions.loginSagaFailure())
//   }
// }

import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import request from '../Services/request'

// attempts to login
const BASE_URL = 'http://localhost:3000/';
export function* login({ phone, password }) {
  try {
    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    });
    var form = new FormData();
    form.append("phone", phone);
    form.append("password", password);
    form.append("app_token", "4ec581692ba08f69d91254fe91314da083591675fa7173c87a88890b621aa9f1");
    const options = {
      method: 'POST',
      body: form,
      headers,
      "processData": false,
      "contentType": false,
      // "mimeType": "multipart/form-data",
    };
    const responsePartial = yield call(request, `${BASE_URL}users/app_sign_in`, options, true);
    yield put(LoginActions.loginSuccess(responsePartial))
  } catch (e) {
    yield put(LoginActions.loginFailure('WRONG'))
  }
  // const headers = new Headers({
  //   'Content-Type': 'multipart/form-data',
  // });

  // const payload = {
  //   phone,
  //   password,
  //   'app_token': '4ec581692ba08f69d91254fe91314da083591675fa7173c87a88890b621aa9f1'
  // }

}
