import { combineReducers } from 'redux';
import { postReducer } from './postsReducer';



export const rootReducer = combineReducers({
  post: postReducer
})

