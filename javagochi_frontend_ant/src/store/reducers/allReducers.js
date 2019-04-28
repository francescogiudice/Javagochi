import { combineReducers } from 'redux';
import jcReducer from './javagochi.js';
import ownedJcReducer from './ownedJavagochi';
import userReducer from './auth.js';

const rootReducer = combineReducers({
  jcReducer,
  ownedJcReducer,
  userReducer
})

export default rootReducer;
