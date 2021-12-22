import { combineReducers } from "redux";
import { FIOReducer } from "./fioReducer";

const rootReducer = combineReducers({
  fio: FIOReducer,
});

export default rootReducer;
