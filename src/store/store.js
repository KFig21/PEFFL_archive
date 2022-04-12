import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { loadState, saveState } from "./LocalStorage";
import throttle from "lodash/throttle";

// persisted state link - https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// persisted state repo - https://github.com/gaearon/todos/blob/03-persisting-state-to-local-storage/src/index.js
const persistedState = loadState();

const middleWare = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancer(applyMiddleware(...middleWare))
);

store.subscribe(
  throttle(() => {
    saveState({
      token: store.getState().token,
    });
  }, 1000)
);

export default store;
