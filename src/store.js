import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
// import { all, fork } from 'redux-saga/effects';
import rootReducer from './reducers';

function* rootSaga() {
  // yield all(drizzleSagas.map(saga => fork(saga)));
}

function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
        sagaMiddleware
      ),
    ),
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(rootSaga);
  return store;
}

const history = createBrowserHistory();
const store = configureStore({}, history);

export { store, history };
