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
import { put, call } from 'redux-saga/effects'
import BeneficiaryActions from '../Redux/BeneficiaryRedux'
import request from '../Services/request'
import { NavigationActions } from 'react-navigation'
import { ToastActionsCreators } from 'react-native-redux-toast';
import { BASE_URL, API_VERSION, APP_TOKEN } from '../Services/constants';

export function * getBeneficiary ({ accessToken, pageNo }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}beneficiary_schemes?page=${pageNo}&access_token=${accessToken}`, options);
    if(status) {
      if (status >= 200 && status < 300) {
        if (!(body && body.length)) {
          yield put(ToastActionsCreators.displayInfo('Nothing New to Show'))
        }
        yield put(BeneficiaryActions.beneficiarySuccess(body))
      } else if(status === 401 ) {
        yield put(BeneficiaryActions.beneficiaryFailure())
        yield put(ToastActionsCreators.displayWarning('message'))
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
      } else {
        yield put(BeneficiaryActions.beneficiaryFailure())
      }
    }
   
  } catch (e) {
    yield put(BeneficiaryActions.beneficiaryFailure())
  }
}

export function * getBeneficiaryDetails ({ accessToken, id }) {
  try {
    const options = {
      method: 'GET',
    };
    const { status, body } = yield call(request, `${BASE_URL}${API_VERSION}beneficiary_schemes/${id}?access_token=${accessToken}`, options);
      if (status >= 200 && status < 300) { 
        yield put(BeneficiaryActions.beneficiaryDetailsSuccess(body))  
      } else {
        yield put(BeneficiaryActions.beneficiaryDetailsFailure())
      }

  } catch (e) {
    yield put(BeneficiaryActions.beneficiaryDetailsFailure())
  }
}