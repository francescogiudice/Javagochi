import { combineReducers } from 'redux';
import jcReducer from './javagochi.js';
import reducer from './auth.js';

const rootReducer = combineReducers({
  jcReducer,
  reducer
})

export default rootReducer;
