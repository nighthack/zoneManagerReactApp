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
import FeedbackActions from '../Redux/FeedbackRedux'
import request from '../Services/request'
import { NavigationActions } from 'react-navigation'
import { ToastActionsCreators } from 'react-native-redux-toast';
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';

export function * getFeedbackList ({ accessToken }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}feedbacks?access_token=${accessToken}`, options);
    if(status >= 200 && status < 300) {
      yield put(FeedbackActions.feedbackSuccess(body))
    } else if( status === 401) {
      yield put(NavigationActions.navigate({ routeName: 'Login' }))
      yield put(ToastActionsCreators.displayWarning('Invalid Session Please Login'))
    } else {
      yield put(FeedbackActions.feedbackFailure())
    }

  } catch (e) {
    yield put(FeedbackActions.feedbackFailure())
  }
}

// export function * getEventDetails ({ accessToken, id }) {
//   try {
//     const options = {
//       method: 'GET',
//     };
//     const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}events/${id}?access_token=${accessToken}`, options);
//     if(status >= 200 && status < 300) {
//       yield put(EventActions.eventDetailsSuccess(body))
//     } else if( status === 401) {
//       yield put(NavigationActions.navigate({ routeName: 'Login' }))
//       yield put(ToastActionsCreators.displayWarning('Invalid Session Please Login'))
//     } else {
//       yield put(EventActions.eventDetailsFailure())
//     }
//   } catch (e) {
//     yield put(EventActions.developmentWorkDetailsFailure())
//   }
// }

export function * getPlacesList ({ accessToken, searchParam }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}common/places?access_token=${accessToken}&search=${searchParam}`, options);
    debugger;
    if(status >= 200 && status < 300) {
      yield put(FeedbackActions.getPlacesListSuccess(body))
    } else if( status === 401) {
      yield put(NavigationActions.navigate({ routeName: 'Login' }))
      yield put(ToastActionsCreators.displayWarning('Invalid Session Please Login'))
    } else {
      yield put(FeedbackActions.getPlacesListFail())
    }
  } catch (e) {
    yield put(FeedbackActions.developmentWorkDetailsFailure())
  }
}

export function * getDepartmentsList ({ accessToken }) {
  try {
    const options = {
      method: 'GET',
    };
    const { customers, products } = yield all({
      departments: call(request, `${BASE_URL}${API_VERSION}common/departments?access_token=${accessToken}`, options),
      statuses: call(request, `${BASE_URL}${API_VERSION}common/status_list?access_token=${accessToken}&model=Feedback`, options),
    })
    debugger;
    if(status >= 200 && status < 300) {
      yield put(FeedbackActions.getPlacesListSuccess(body))
    } else if( status === 401) {
      yield put(NavigationActions.navigate({ routeName: 'Login' }))
      yield put(ToastActionsCreators.displayWarning('Invalid Session Please Login'))
    } else {
      yield put(FeedbackActions.getPlacesListFail())
    }
  } catch (e) {
    yield put(FeedbackActions.developmentWorkDetailsFailure())
  }
}