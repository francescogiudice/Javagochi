import { combineReducers } from 'redux';
import jcReducer from './javagochi';
import ownedJcReducer from './ownedJavagochi';
import userReducer from './auth';
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
