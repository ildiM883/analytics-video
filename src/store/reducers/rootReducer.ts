import { combineReducers } from 'redux';
import analyticsReducer from './analyticsReducer';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
  analytics: analyticsReducer,
  video: videoReducer,
});

export default rootReducer;