import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import orderReducer from './orderSlice';
import feedReducer from './feedSlice';
import profileReducer from './profileSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  profile: profileReducer
});

export default rootReducer;
