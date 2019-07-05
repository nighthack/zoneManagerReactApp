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


// export function* getPlacesListForSearchParam({ searchParam }) {
//   try {
//     const options = {
//       method: 'GET',
//     };
//     const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}commons/places?app_token=${APP_TOKEN}&search=${searchParam}`, options);
//     switch (status) {
//       case undefined:
//         {
//           yield put(FeedbackActions.getPlacesListFail(503));
//           yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
//           break;
//         }
//       case 401:
//         {
//           yield put(NavigationActions.navigate({ routeName: 'Login' }))
//           yield put(FeedbackActions.getPlacesListFail(status));
//           yield put(ToastActionsCreators.displayWarning('Invalid Access'));
//           yield put(LoginActions.logoutRequest(accessToken));
//           // TO DO ADD LOGOUT
//           break;
//         }
//       case 200:
//         {
//           yield put(FeedbackActions.getPlacesListSuccess(body))
//           break;
//         }
//       default:
//         {
//           yield put(FeedbackActions.getPlacesListFail(status || 503));
//           if (body && body.message && typeof body.message === 'string') {
//             yield put(ToastActionsCreators.displayInfo(message));
//           } else {
//             yield put(ToastActionsCreators.displayInfo('oops!!'));
//           }
//         }
//     }

//   } catch (error) {
//     yield put(FeedbackActions.getPlacesListFail(503));
//     yield put(ToastActionsCreators.displayInfo('oops!!'));
//   }
// }

// export function* getDepartmentsList({ accessToken }) {
//   try {
//     const options = {
//       method: 'GET',
//     };
//     // departments
//     // departments: call(request, `${BASE_URL}${API_VERSION}commons/departments?access_token=${accessToken}`, options),
//     const { body, status } = yield call(request, `${BASE_URL}${API_VERSION}commons/status_list?access_token=${accessToken}&model=Feedback`, options);
//     switch (status) {
//       case undefined:
//         {
//           yield put(FeedbackActions.getDepartmentsListFail(503));
//           yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
//           break;
//         }
//       case 401:
//         {
//           yield put(NavigationActions.navigate({ routeName: 'Login' }))
//           yield put(FeedbackActions.getDepartmentsListFail(status));
//           yield put(ToastActionsCreators.displayWarning('Invalid Access'));
//           yield put(LoginActions.logoutRequest(accessToken));
//           break;
//         }
//       case 200:
//         {
//           yield put(FeedbackActions.getDepartmentsListSuccess({ statuses: body }))
//           break;
//         }
//       default:
//         {
//           yield put(FeedbackActions.getDepartmentsListFail(status || 503));
//           if (body && body.message && typeof body.message === 'string') {
//             yield put(ToastActionsCreators.displayInfo(message));
//           } else {
//             yield put(ToastActionsCreators.displayInfo('oops!!'));
//           }
//         }
//     }

//   } catch (error) {
//     yield put(FeedbackActions.getDepartmentsListFail(503));
//     yield put(ToastActionsCreators.displayInfo('oops!!'));
//   }
// }


// export function* createFeedback({ accessToken, data }) {
//   try {
//     const headers = new Headers({
//       'Content-Type': 'multipart/form-data',
//       "cache-control": "no-cache",
//     });
//     data.append("app_token", APP_TOKEN);
//     const options = {
//       method: 'POST',
//       body: data,
//       headers,
//       processData: false,
//       contentType: false,
//       credentials: 'same-origin'
//     };


//     const { body, status } = yield call(request, `${BASE_URL}${API_VERSION}feedbacks?access_token=${accessToken}`, options);
//     switch (status) {
//       case undefined:
//         {
//           yield put(FeedbackActions.createFeedbackFail(503));
//           yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
//           break;
//         }
//       case 401:
//         {
//           yield put(NavigationActions.navigate({ routeName: 'Login' }))
//           yield put(FeedbackActions.createFeedbackFail(status));
//           yield put(ToastActionsCreators.displayWarning('Invalid Access'));
//           yield put(LoginActions.logoutRequest(accessToken));
//           break;
//         }
//       case 200:
//         {
//           yield put(FeedbackActions.createFeedbackSuccess(body));
//           // yield put(FeedbackActions.feedbackOnListRequest(accessToken, 1));
//           yield put(ToastActionsCreators.displayInfo('Thanks for your valuable feedback'));
//           break;
//         }
//       default:
//         {
//           yield put(FeedbackActions.createFeedbackFail(status || 503));
//           if (body && body.message && typeof body.message === 'string') {
//             yield put(ToastActionsCreators.displayInfo(message));
//           } else {
//             yield put(ToastActionsCreators.displayInfo('oops!!'));
//           }
//         }
//     }

//   } catch (error) {
//     yield put(FeedbackActions.createFeedbackFail(503));
//     yield put(ToastActionsCreators.displayInfo('oops!!'));
//   }
// }
