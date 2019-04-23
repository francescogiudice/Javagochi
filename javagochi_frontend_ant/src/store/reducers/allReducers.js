import { combineReducers } from 'redux';
import jcReducer from './javagochi.js';
import ownedJcReducer from './ownedJavagochi';
import reducer from './auth.js';

const rootReducer = combineReducers({
  jcReducer,
  ownedJcReducer,
  reducer
})

export default rootReducer;
