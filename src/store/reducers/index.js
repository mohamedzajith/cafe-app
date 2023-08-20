import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import apiReducer from "./apiReducers";

const rootReducer = combineReducers({
  api: apiReducer,
  form: formReducer,
});

export default rootReducer;
