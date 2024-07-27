import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authStore";

const store = configureStore({
  reducer: combineReducers({ authReducer }),
});
export default store;
