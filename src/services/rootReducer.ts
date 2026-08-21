import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import feedReducer from './feedSlice';
import profileReducer from './profileSlice';
import orderInfoReducer from './orderInfoSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  profile: profileReducer,
  orderInfo: orderInfoReducer
});

export default rootReducer;
