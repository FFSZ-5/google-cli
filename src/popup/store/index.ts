import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";

import reducer from "./action";
import { thunk } from "redux-thunk";

const store = createStore(
  combineReducers({
    reducer,
  }),
  applyMiddleware(thunk)
);

export default store;
