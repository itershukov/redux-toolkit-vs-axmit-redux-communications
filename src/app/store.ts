import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootReducer, { RootState } from './rootReducer'
import rootSaga from './sagas'
import { IIssueConnectedProps } from '../communications/issue/issue.types'
import { IRepoConnectedProps } from '../communications/repo/repo.types'

export interface IApplicationState {
  issue: IIssueConnectedProps;
  repo: IRepoConnectedProps;
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore<IApplicationState>({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

sagaMiddleware.run(rootSaga);

export default store
