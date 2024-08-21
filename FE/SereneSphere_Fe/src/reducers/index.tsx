
import { combineReducers } from 'redux';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import followReducer from './followReducer';
import messagesReducer from './messagesReducer';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  post:postReducer,
  comment: commentReducer,
  follow :followReducer,
  messages:messagesReducer,
  profile: profileReducer,
  search:searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
