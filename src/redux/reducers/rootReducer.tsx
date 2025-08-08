import {combineReducers} from 'redux';
import authReducer from './authReducer';
import advanceSearchReducer from './advanceSearchReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  advanceSearch:advanceSearchReducer
});

export default rootReducer;
