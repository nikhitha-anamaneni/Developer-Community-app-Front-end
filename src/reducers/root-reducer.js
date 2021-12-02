//import counterReducer from "./counter-reducer";
//import productReducer from "./product-reducer";
import LoginReducer from "./login-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // counter: counterReducer,
  //fakestore: productReducer,
  login: LoginReducer,
});

export default rootReducer;
