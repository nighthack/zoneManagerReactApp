import { combineReducers } from 'redux'
import { toastReducer as toast } from 'react-native-redux-toast';
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  login: require('./LoginRedux').reducer,
  beneficiary: require('./BeneficiaryRedux').reducer,
  development: require('./DevelopmentWorkRedux').reducer,
  event: require('./EventRedux').reducer,
  feedback: require('./FeedbackRedux').reducer,
  toast,
})
export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return reducers(state, action)
}
export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(rootReducer, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
