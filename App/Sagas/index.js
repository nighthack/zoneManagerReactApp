import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { VerifiedSignUpTypes } from '../Redux/VerifiedSignUpRedux'
import { BeneficiaryTypes } from '../Redux/BeneficiaryRedux'
import { DevelopmentWorkTypes } from '../Redux/DevelopmentWorkRedux'
import { EventTypes } from '../Redux/EventRedux'
import { FeedbackTypes } from '../Redux/FeedbackRedux'
/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
import { 
    login, 
    getOTP, 
    verifyOTP, 
    singupRequest, 
    onLogout, 
    onResetPasswordAction, 
    onVerifyUser,
} from './LoginSaga'
import { getBeneficiary, getBeneficiaryDetails } from './BeneficiarySagas'
import { getDevelopmentList, getDevelopmentDetails } from './DevelopmentWorkSagas'
import { getEventsList, getEventDetails } from './EventSagas';
import { getPlacesList, getDepartmentsList, getFeedbackList } from './FeedbackSagas';
// import { getAllPositions,  } from './VerifiedSignUpSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    console.log()

  yield all([
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.OTP_REQUEST, getOTP),
    // takeLatest(LoginTypes.VERIFY_OTP, verifyOTP),
    takeLatest(LoginTypes.SIGNUP_REQUEST, singupRequest),
    takeLatest(LoginTypes.LOGOUT_REQUEST, onLogout),
    takeLatest(LoginTypes.RESET_PASSWORD_REQUEST, onResetPasswordAction),
    takeLatest(LoginTypes.VERIFY_USER, onVerifyUser),
    // Beneficiary Module
    takeLatest(BeneficiaryTypes.BENEFICIARY_REQUEST, getBeneficiary),
    takeLatest(BeneficiaryTypes.BENEFICIARY_DETAILS_REQUEST, getBeneficiaryDetails),
    // Development Module
    takeLatest(DevelopmentWorkTypes.DEVELOPMENT_WORK_REQUEST, getDevelopmentList),
    takeLatest(DevelopmentWorkTypes.DEVELOPMENT_WORK_DETAILS_REQUEST, getDevelopmentDetails),
    // Feedback Module
    takeLatest(FeedbackTypes.GET_PLACES_LIST, getPlacesList),
    takeLatest(FeedbackTypes.GET_DEPARTMENTS_LIST, getDepartmentsList),
    takeLatest(FeedbackTypes.FEEDBACK_REQUEST,getFeedbackList),
    // Events
    takeLatest(EventTypes.EVENT_REQUEST, getEventsList),
    takeLatest(EventTypes.EVENT_DETAILS_REQUEST,getEventDetails),
  ])
}
