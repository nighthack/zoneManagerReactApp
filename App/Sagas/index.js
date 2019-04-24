import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { VerifiedSignUpTypes } from '../Redux/VerifiedSignUpRedux'
import { BeneficiaryTypes } from '../Redux/BeneficiaryRedux'
/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
import { login, getOTP, verifyOTP } from './LoginSaga'
import { getBeneficiary } from './BeneficiarySagas'
import { getAllPositions, singupRequest } from './VerifiedSignUpSagas'
// import { getUserAvatar } from './GithubSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.OTP_REQUEST, getOTP),
    takeLatest(LoginTypes.VERIFY_OTP, verifyOTP),
    takeLatest(LoginTypes.VERIFY_OTP, verifyOTP),
    takeLatest(VerifiedSignUpTypes.GET_POSITIONS, getAllPositions),
    takeLatest(VerifiedSignUpTypes.SIGNUP_REQUEST, singupRequest),
    takeLatest(BeneficiaryTypes.BENEFICIARY_REQUEST, getBeneficiary),
  ])
}
