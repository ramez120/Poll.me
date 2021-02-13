import { combineReducers } from "redux";
import {reducer as reduxReducer} from 'redux-form';
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";


export default combineReducers({
  auth: authReducer,
  form :reduxReducer,
  surveys : surveyReducer
});
