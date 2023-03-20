import { combineReducers } from "redux";
import { appReducer } from "../App/reducers";
import { photoReducer } from "../Photo/reducers";

const rootReducer = combineReducers({
  appReducer,
  photoReducer,
});

export default rootReducer;
