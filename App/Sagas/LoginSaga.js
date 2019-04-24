import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import request from '../Services/request'
import AsyncStorage from '@react-native-community/async-storage';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { NavigationActions } from 'react-navigation'

// attempts to login
const BASE_URL = 'http://localhost:3000/api/v1/';
export function* login({ phone, password }) {
  try {
    const headers = new Headers({
      'Content-Type': 'multipart/form-data',
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
      processData: false,
      contentType: false,
      credentials: 'same-origin'

    };
    const token = yield call(request, `${BASE_URL}users/sign_in`, options);
    storeData = async () => {
      try {
        await AsyncStorage.setItem('user', token)
      } catch (e) {
        // saving error
      }
      getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user')
          if (value !== null) {
            // value previously stored
            debugger;
          }
        } catch (e) {
          // error reading value
        }
      }
      console.log(getData);
    }
    yield put(LoginActions.loginSuccess(token))
    yield put(NavigationActions.navigate({ routeName: 'Home' }))

  } catch (e) {
    console.log(e);
    yield put(ToastActionsCreators.displayWarning('Invalid User Phone / password!'))
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

export function* getOTP({ phone }) {
  try {
    const headers = new Headers({
      // "Content-Type": "application/x-www-form-urlencoded",
      'Content-Type': 'multipart/form-data',
      "cache-control": "no-cache",
    });
    var form = new FormData();
    form.append("phone", phone);
    form.append("app_token", "4ec581692ba08f69d91254fe91314da083591675fa7173c87a88890b621aa9f1");
    const options = {
      method: 'POST',
      body: form,
      headers,
      processData: false,
      contentType: false,
      credentials: 'same-origin'
    };
    const response = yield call(request, `${BASE_URL}users/otp`, options);
    yield put(LoginActions.otpSuccess(response));
    // yield put(NavigationActions.navigate({ routeName: 'Home' })

  } catch (e) {
    const response = { message: "Oops Please try" };
    yield put(LoginActions.otpFailure(response))
  }
}

export function* verifyOTP({ phone, otp }) {
  try {
    const headers = new Headers({
      // "Content-Type": "application/x-www-form-urlencoded",
      'Content-Type': 'multipart/form-data',
      "cache-control": "no-cache",
    });
    var form = new FormData();
    form.append("phone", phone);
    form.append("otp", otp);
    form.append("app_token", "4ec581692ba08f69d91254fe91314da083591675fa7173c87a88890b621aa9f1");
    const options = {
      method: 'POST',
      body: form,
      headers,
      processData: false,
      contentType: false,
      credentials: 'same-origin'
    };
    const response = yield call(request, `${BASE_URL}users/otp_verify`, options);
    yield put(LoginActions.verifyOtpSuccess(response))
  } catch (e) {
    const response = { message: "Oops Please try" };
    yield put(LoginActions.verifyOtpFailure(response))
  }
}
