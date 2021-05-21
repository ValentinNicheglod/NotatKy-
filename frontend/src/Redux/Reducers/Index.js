import { combineReducers } from 'redux';
import { notesReducer } from './Notes';
import { collectionsReducer } from './Collections';
import { tagsReducer } from './Tags';
import { usersReducer } from './Users';

const reducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
  collections: collectionsReducer,
  users: usersReducer,
});

export default reducer;
