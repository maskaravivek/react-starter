import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reduxPromiseMiddleware from "redux-promise-middleware";
import reduxSaga from "redux-saga";

import { IStore, rootReducer } from "@reducers";
import { rootSaga } from "@sagas";

export const reduxPersistKey = "persist";

export default (initialState: IStore) => {
  const sagaMiddleware = reduxSaga();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleware, sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
