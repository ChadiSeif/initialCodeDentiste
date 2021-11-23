import { combineReducers } from "redux";
import medecinReducer from "./medecinReducer";
import userReducer from "./userReducer";
import RdvReducer from "./RdvReducer";
import disponibilityReducer from "./disponibilityReducer";

const rootReducer = combineReducers({
  userReducer,
  medecinReducer,
  RdvReducer,
  disponibilityReducer,
});

export default rootReducer;
