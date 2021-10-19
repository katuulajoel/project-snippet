import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import monitorReducersEnhancer from "../configs/enhancers/monitorReducer";
import loggerMiddleware from "../configs/middleware/logger";
import rootReducer from "./reducers";

export function configureStore(preloadedState = {}) {
  const middlewares = [loggerMiddleware, reduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}

const store = configureStore();
export default store;
