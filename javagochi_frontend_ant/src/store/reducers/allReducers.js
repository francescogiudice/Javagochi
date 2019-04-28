import { combineReducers } from 'redux';
import jcReducer from './javagochi.js';
import ownedJcReducer from './ownedJavagochi';
import userReducer from './auth.js';
import tradesReducer from './trades';
import itemsReducer from './items';
import ownedItemsReducer from './ownedItems';

const rootReducer = combineReducers({
  jcReducer,
  ownedJcReducer,
  userReducer,
  tradesReducer,
  itemsReducer,
  ownedItemsReducer
})

export default rootReducer;
