import { put, call } from 'redux-saga/effects'
import SignUpRedux from '../Redux/VerifiedSignUpRedux'
import request from '../Services/request'

// attempts to login
const BASE_URL = 'http://localhost:3000/api/v1/';

export function* getAllPositions() {
  try {
    const options = {
      method: 'GET',
    };
    const positions = yield call(request, `${BASE_URL}users/positions`, options);
    yield put(SignUpRedux.getPositionSuccess(positions));
  } catch (e) {
    yield put(SignUpRedux.getPositionSuccess([]))
  }
}


export function* singupRequest({ data }) {
  try {
    const headers = new Headers({
      'Content-Type': 'multipart/form-data',
      "cache-control": "no-cache",
    });
    const options = {
      method: 'POST',
      headers,
      processData: false,
      contentType: false,
      credentials: 'same-origin',
      body: data,
    };
    const response = yield call(request, `${BASE_URL}users`, options);
    yield put(SignUpRedux.signupSuccess(response));
  } catch (e) {
    yield put(SignUpRedux.signupFailure({}))
  }
}