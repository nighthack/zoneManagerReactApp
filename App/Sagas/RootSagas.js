import { call, put } from 'redux-saga/effects'
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';
import { NavigationActions } from 'react-navigation';
import { ToastActionsCreators } from 'react-native-redux-toast';
import RootActions from '../Redux/RootRedux';
import LoginActions from '../Redux/LoginRedux';
import request from '../Services/request'

// import { ModuleSelectors } from '../Redux/ModuleRedux'
const moduleURL = 'users';

export function* getUserDetails({ accessToken, pageNo }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}/me?access_token=${accessToken}`, options);
    switch (status) {
      case undefined: {
        yield put(RootActions.getUserDetailsFail(503));
        yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
        break;
      }
      case 401: {
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(RootActions.getUserDetailsFail(status));
        yield put(ToastActionsCreators.displayWarning('Invalid Access'));
        yield put(LoginActions.logoutRequest(accessToken));
        // TO DO ADD LOGOUT
        break;
      }
      case 200: {
        yield put(RootActions.getUserDetailsSuccess(body))
        if (!(body && body.length)) {
          yield put(ToastActionsCreators.displayInfo('End of List'));
        }
        break;
      }
      default: {
        yield put(RootActions.getUserDetailsFail(status || 503 ));
        if(body && body.message && typeof body.message === 'string') {
          yield put(ToastActionsCreators.displayInfo(message));
        } else {
          yield put(ToastActionsCreators.displayInfo('oops!!'));
        }
      }
    }

  } catch (error) {
    console.log(error);
    yield put(RootActions.getUserDetailsFail(503));
    yield put(ToastActionsCreators.displayInfo('oops!!'));
  }
}


// export function* getModuleDetails({ accessToken, id }) {
//   try {
//     const options = {
//       method: 'GET',
//     };
//     const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}${moduleURL}/${id}?access_token=${accessToken}`, options);
//     switch (status) {
//       case undefined: {
//         yield put(ModuleActions.moduleOnDetailFailure(503));
//         yield put(ToastActionsCreators.displayWarning('Check your internet Connection'))
//         break;
//       }
//       case 401: {
//         yield put(NavigationActions.navigate({ routeName: 'Login' }))
//         yield put(ModuleActions.moduleOnDetailFailure(status));
//         yield put(ToastActionsCreators.displayWarning('Invalid Access'));
//         yield put(LoginActions.logoutRequest(accessToken));
//         // TO DO ADD LOGOUT
//         break;
//       }
//       case 200: {
//         yield put(ModuleActions.moduleOnDetailSuccess(body))
//         break;
//       }
//       default: {
//         yield put(ModuleActions.moduleOnDetailFailure(status || 503 ));
//         if(body && body.message && typeof body.message === 'string') {
//           yield put(ToastActionsCreators.displayInfo(message));
//         } else {
//           yield put(ToastActionsCreators.displayInfo('oops!!'));
//         }
//       }
//     }

//   } catch (error) {
//     console.log(error);
//     yield put(ModuleActions.moduleOnDetailFailure(503));
//     yield put(ToastActionsCreators.displayInfo('oops!!'));
//   }
// }
